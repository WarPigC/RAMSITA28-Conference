import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
// Automatically strip trailing slashes or /rest/v1 if present
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Create Supabase client
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = Boolean(supabase);

/**
 * Fetch conference content directly and exclusively from Supabase PostgreSQL tables
 */
export async function fetchConferenceContent() {
  if (!supabase) {
    throw new Error('Supabase client is not configured. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env');
  }

  // 1. Fetch site settings
  const { data: settingsData, error: sErr } = await supabase
    .from('site_settings')
    .select('key, value');

  if (sErr) throw sErr;

  const settings = {};
  (settingsData || []).forEach((row) => {
    try {
      settings[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
    } catch {
      settings[row.key] = row.value;
    }
  });

  // 2. Fetch Keynote Speakers
  const { data: speakers, error: spErr } = await supabase
    .from('keynote_speakers')
    .select('id, name, title, institution, topic, avatar')
    .order('display_order', { ascending: true });

  if (spErr) throw spErr;

  // 3. Fetch Important Dates
  const { data: important_dates, error: dErr } = await supabase
    .from('important_dates')
    .select('id, event, date, status, highlight')
    .order('display_order', { ascending: true });

  if (dErr) throw dErr;

  // 4. Fetch Tracks
  const { data: tracks, error: tErr } = await supabase
    .from('tracks')
    .select('id, number, name, scope, color')
    .order('display_order', { ascending: true });

  if (tErr) throw tErr;

  // 5. Fetch Latest News
  const { data: latest_news, error: nErr } = await supabase
    .from('latest_news')
    .select('id, date, category, title, text, image, link')
    .order('display_order', { ascending: true });

  if (nErr) throw nErr;

  // 6. Fetch Previous Events
  const { data: previous_events, error: peErr } = await supabase
    .from('previous_events')
    .select('id, year, title, subtitle, desc, image, link, stats')
    .order('display_order', { ascending: true });

  if (peErr) throw peErr;

  // 7. Fetch Sponsor Logos
  const { data: sponsor_logos, error: slErr } = await supabase
    .from('sponsor_logos')
    .select('id, name, logo, tier')
    .order('display_order', { ascending: true });

  if (slErr) throw slErr;

  // 8. Fetch Registration Fees
  const { data: feesData, error: fErr } = await supabase
    .from('registration_fees')
    .select('id, category, inr, usd, perks')
    .order('display_order', { ascending: true });

  if (fErr) throw fErr;

  const fees = (feesData || []).map((f) => ({
    ...f,
    perks: typeof f.perks === 'string' ? JSON.parse(f.perks) : (f.perks || [])
  }));

  // 9. Fetch Committee Members
  const { data: members, error: mErr } = await supabase
    .from('committee_members')
    .select('id, category, name, role, affiliation')
    .order('display_order', { ascending: true });

  if (mErr) throw mErr;

  const committees = {
    chiefPatron: [],
    patrons: [],
    chairs: [],
    steering: [],
    advisoryInternational: [],
    advisoryNational: []
  };
  (members || []).forEach((m) => {
    if (committees[m.category]) {
      committees[m.category].push({
        name: m.name,
        role: m.role || undefined,
        affiliation: m.affiliation || undefined
      });
    }
  });

  // 10. Fetch Gallery Photos
  const { data: gallery, error: gErr } = await supabase
    .from('gallery_photos')
    .select('id, title, category, image, caption')
    .order('display_order', { ascending: true });

  if (gErr) throw gErr;

  return {
    meta: settings.meta || {},
    marquee: settings.marquee || [],
    hero: settings.hero || {},
    usps: settings.usps || [],
    intro_scope: settings.intro_scope || {},
    call_for_papers: settings.call_for_papers || {},
    tracks: tracks || [],
    important_dates: (important_dates || []).map(d => ({ ...d, highlight: Boolean(d.highlight) })),
    speakers: speakers || [],
    latest_news: latest_news || [],
    previous_events: previous_events || [],
    sponsor_logos: sponsor_logos || [],
    registration: {
      guidelines: settings.registration_guidelines || '',
      notes: settings.registration_notes || [],
      fees: fees || [],
      bank: settings.registration_bank || {}
    },
    committees,
    about: settings.about || {},
    sponsors: settings.sponsors || {},
    gallery: gallery || [],
    contact: settings.contact || {}
  };
}

/**
 * Save updated conference content directly to Supabase tables
 */
export async function saveConferenceContent(data) {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  // 1. Upsert site settings
  const settingsEntries = [
    { key: 'meta', value: JSON.stringify(data.meta || {}) },
    { key: 'marquee', value: JSON.stringify(data.marquee || []) },
    { key: 'hero', value: JSON.stringify(data.hero || {}) },
    { key: 'usps', value: JSON.stringify(data.usps || []) },
    { key: 'intro_scope', value: JSON.stringify(data.intro_scope || {}) },
    { key: 'call_for_papers', value: JSON.stringify(data.call_for_papers || {}) },
    { key: 'about', value: JSON.stringify(data.about || {}) },
    { key: 'sponsors', value: JSON.stringify(data.sponsors || {}) },
    { key: 'contact', value: JSON.stringify(data.contact || {}) },
    { key: 'registration_bank', value: JSON.stringify(data.registration?.bank || {}) },
    { key: 'registration_notes', value: JSON.stringify(data.registration?.notes || []) },
    { key: 'registration_guidelines', value: JSON.stringify(data.registration?.guidelines || '') }
  ];

  await supabase.from('site_settings').upsert(settingsEntries, { onConflict: 'key' });

  // 2. Replace Speakers
  if (Array.isArray(data.speakers)) {
    await supabase.from('keynote_speakers').delete().neq('id', '___');
    const speakerRows = data.speakers.map((sp, idx) => ({
      id: sp.id || `sp-${idx}`,
      name: sp.name,
      title: sp.title || '',
      institution: sp.institution || '',
      topic: sp.topic || '',
      avatar: sp.avatar || '',
      display_order: idx
    }));
    if (speakerRows.length > 0) {
      await supabase.from('keynote_speakers').insert(speakerRows);
    }
  }

  // 3. Replace Important Dates
  if (Array.isArray(data.important_dates)) {
    await supabase.from('important_dates').delete().neq('id', '___');
    const dateRows = data.important_dates.map((d, idx) => ({
      id: d.id || `d-${idx}`,
      event: d.event,
      date: d.date,
      status: d.status,
      highlight: d.highlight ? 1 : 0,
      display_order: idx
    }));
    if (dateRows.length > 0) {
      await supabase.from('important_dates').insert(dateRows);
    }
  }

  // 4. Replace Tracks
  if (Array.isArray(data.tracks)) {
    await supabase.from('tracks').delete().neq('id', '___');
    const trackRows = data.tracks.map((t, idx) => ({
      id: t.id || `track-${idx}`,
      number: t.number,
      name: t.name,
      scope: t.scope,
      color: t.color || '',
      display_order: idx
    }));
    if (trackRows.length > 0) {
      await supabase.from('tracks').insert(trackRows);
    }
  }

  // 5. Replace Latest News
  if (Array.isArray(data.latest_news)) {
    await supabase.from('latest_news').delete().neq('id', '___');
    const newsRows = data.latest_news.map((n, idx) => ({
      id: n.id || `news-${idx}`,
      date: n.date,
      category: n.category,
      title: n.title,
      text: n.text,
      image: n.image || '',
      link: n.link || '',
      display_order: idx
    }));
    if (newsRows.length > 0) {
      await supabase.from('latest_news').insert(newsRows);
    }
  }

  // 6. Replace Previous Events
  if (Array.isArray(data.previous_events)) {
    await supabase.from('previous_events').delete().neq('id', '___');
    const eventRows = data.previous_events.map((ev, idx) => ({
      id: ev.id || `pe-${idx}`,
      year: ev.year,
      title: ev.title,
      subtitle: ev.subtitle || '',
      desc: ev.desc || '',
      image: ev.image || '',
      link: ev.link || '',
      stats: ev.stats || '',
      display_order: idx
    }));
    if (eventRows.length > 0) {
      await supabase.from('previous_events').insert(eventRows);
    }
  }

  // 7. Replace Sponsor Logos
  if (Array.isArray(data.sponsor_logos)) {
    await supabase.from('sponsor_logos').delete().neq('id', '___');
    const sponsorRows = data.sponsor_logos.map((sp, idx) => ({
      id: sp.id || `sl-${idx}`,
      name: sp.name,
      logo: sp.logo,
      tier: sp.tier || '',
      display_order: idx
    }));
    if (sponsorRows.length > 0) {
      await supabase.from('sponsor_logos').insert(sponsorRows);
    }
  }

  // 8. Replace Registration Fees
  if (Array.isArray(data.registration?.fees)) {
    await supabase.from('registration_fees').delete().neq('id', '___');
    const feeRows = data.registration.fees.map((f, idx) => ({
      id: f.id || `fee-${idx}`,
      category: f.category,
      inr: f.inr,
      usd: f.usd,
      perks: JSON.stringify(f.perks || []),
      display_order: idx
    }));
    if (feeRows.length > 0) {
      await supabase.from('registration_fees').insert(feeRows);
    }
  }

  // 9. Replace Gallery
  if (Array.isArray(data.gallery)) {
    await supabase.from('gallery_photos').delete().neq('id', '___');
    const galleryRows = data.gallery.map((p, idx) => ({
      id: p.id || `g-${idx}`,
      title: p.title,
      category: p.category,
      image: p.image,
      caption: p.caption || '',
      display_order: idx
    }));
    if (galleryRows.length > 0) {
      await supabase.from('gallery_photos').insert(galleryRows);
    }
  }

  return { success: true, data };
}

/**
 * Upload an image file directly to Supabase Storage Bucket
 */
export async function uploadImageToSupabase(file, bucketName = 'conference-assets') {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
