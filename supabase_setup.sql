-- ==============================================================================
-- RAMSITA 2028 Conference Schema & Initial Data for Supabase
-- Paste this entire file into your Supabase Dashboard -> SQL Editor and hit 'Run'
-- ==============================================================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS keynote_speakers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  institution TEXT,
  topic TEXT,
  avatar TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS important_dates (
  id TEXT PRIMARY KEY,
  event TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL,
  highlight INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tracks (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL,
  name TEXT NOT NULL,
  scope TEXT NOT NULL,
  color TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS latest_news (
  id TEXT PRIMARY KEY,
  date TEXT,
  category TEXT,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  image TEXT,
  link TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS previous_events (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  "desc" TEXT,
  image TEXT,
  link TEXT,
  stats TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sponsor_logos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  tier TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS registration_fees (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  inr INTEGER NOT NULL,
  usd INTEGER NOT NULL,
  perks JSONB NOT NULL,
  display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS committee_members (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  affiliation TEXT,
  display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gallery_photos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row-Level Security (RLS) & Public Policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE keynote_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE important_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE latest_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE previous_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Allow Public Reads and Writes for All Visitors
DROP POLICY IF EXISTS "Public Read" ON site_settings;
CREATE POLICY "Public Read" ON site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON site_settings;
CREATE POLICY "Public Write" ON site_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read" ON keynote_speakers;
CREATE POLICY "Public Read" ON keynote_speakers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON keynote_speakers;
CREATE POLICY "Public Write" ON keynote_speakers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read" ON important_dates;
CREATE POLICY "Public Read" ON important_dates FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON important_dates;
CREATE POLICY "Public Write" ON important_dates FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read" ON tracks;
CREATE POLICY "Public Read" ON tracks FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON tracks;
CREATE POLICY "Public Write" ON tracks FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read" ON latest_news;
CREATE POLICY "Public Read" ON latest_news FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON latest_news;
CREATE POLICY "Public Write" ON latest_news FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read" ON previous_events;
CREATE POLICY "Public Read" ON previous_events FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON previous_events;
CREATE POLICY "Public Write" ON previous_events FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read" ON sponsor_logos;
CREATE POLICY "Public Read" ON sponsor_logos FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON sponsor_logos;
CREATE POLICY "Public Write" ON sponsor_logos FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read" ON registration_fees;
CREATE POLICY "Public Read" ON registration_fees FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON registration_fees;
CREATE POLICY "Public Write" ON registration_fees FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read" ON committee_members;
CREATE POLICY "Public Read" ON committee_members FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON committee_members;
CREATE POLICY "Public Write" ON committee_members FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read" ON gallery_photos;
CREATE POLICY "Public Read" ON gallery_photos FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Write" ON gallery_photos;
CREATE POLICY "Public Write" ON gallery_photos FOR ALL USING (true) WITH CHECK (true);

-- 3. Grant table privileges to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated;

INSERT INTO site_settings (key, value) VALUES ('meta', '{"conferenceTitle": "3rd International Conference on Recent Advancement and Modernization in Sustainable Intelligent Technologies & Applications", "shortName": "RAMSITA 2028", "proceedingsTitle": "Advanced Innovation in Technology and Research (AITR-2028)", "publisher": "Springer Nature (Atlantis Press AISR & BJIT Journal)", "dates": "February 11\u201312, 2028", "venue": "Acropolis Institute of Technology and Research (AITR)", "location": "Bypass Road, Manglia Square, Indore, Madhya Pradesh - 453771, India", "mode": "Hybrid Mode (In-Person & Virtual Presentation)", "email": "ramsita@acropolis.in", "phone": "0731-4730111, +91-9425720000"}'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('marquee', '["\ud83d\udd25 RAMSITA 2028 Call for Papers is officially OPEN \u2014 Submit via Microsoft CMT", "\ud83d\udcda Accepted & presented papers will be submitted to Atlantis Press (part of Springer Nature Group) AISR Series", "\u2728 Special Fast-Track consideration for Scopus-Indexed BJIT - International Journal of Information Technology (Springer Nature)", "\ud83c\udfc6 Best PhD Thesis Award Nominations are now OPEN", "\ud83d\uddd3\ufe0f Conference Dates: February 11-12, 2028 | Hybrid Mode: Indore, India & Virtual"]'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('hero', '{"badge": "Springer Nature Proceedings \u2022 Hybrid Conference", "heading": "Innovating the Future Through Intelligent and Sustainable Technologies", "subheading": "Uniting dynamic researchers, esteemed academicians, and global industry leaders to explore responsible AI, quantum computing, cybersecurity, and green tech.", "countdownTarget": "2028-02-11T09:00:00", "cmtLink": "https://cmt3.research.microsoft.com", "registrationLink": "https://forms.gle/ramsita2028"}'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('usps', '[{"id": "1", "title": "Convergence of Future Technologies", "description": "Brings Generative AI, Quantum Computing, Cybersecurity, and Sustainable Computing together under one premier research umbrella.", "icon": "Cpu"}, {"id": "2", "title": "AI & Quantum Integration", "description": "Encourages groundbreaking research at the vital intersection of quantum algorithms, machine learning, and high-performance computing.", "icon": "Atom"}, {"id": "3", "title": "Security by Design", "description": "Emphasizes trustworthy AI, privacy-preserving architectures, zero-trust paradigms, and post-quantum cryptographic resilience.", "icon": "ShieldCheck"}, {"id": "4", "title": "Green & Responsible AI", "description": "Spotlights energy-efficient models, low-carbon computational infrastructure, and environmentally sustainable technology lifecycles.", "icon": "Leaf"}, {"id": "5", "title": "Research with Real-World Impact", "description": "Fosters experimental validation, open datasets, production deployments, and tangible solutions for agriculture, healthcare, and smart cities.", "icon": "Sparkles"}, {"id": "6", "title": "Global Academic Networking", "description": "Connects Indian researchers with eminent professors and research labs across USA, UK, Taiwan, Australia, Vietnam, and Singapore.", "icon": "Globe"}]'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('intro_scope', '{"intro_heading": "Welcome to RAMSITA 2028", "intro_text": "The 3rd International Conference on Recent Advancement and Modernization in Sustainable Intelligent Technologies & Applications (RAMSITA - 2028) is being organized in Hybrid Mode by Acropolis Institute of Technology and Research, Indore, MP, India on February 11-12, 2028. RAMSITA 2028 provides a premier international forum for researchers, developers, practitioners, and educators from around the globe to discuss recent innovations, trends, and concerns, as well as practical challenges encountered and solutions adopted in the fields of sustainable intelligent technologies and applications.", "scope_heading": "Scope & Core Objectives", "scope_text": "The primary objective of RAMSITA 2028 is to bring together dynamic researchers, academicians, and industry specialists to explore innovative solutions in cutting-edge intelligent algorithms, green computing, cyber-physical systems, and next-generation networks. All accepted and presented papers fulfilling Springer Nature standards will be submitted for publication in Atlantis Press (part of Springer Nature Group) AISR Series."}'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('call_for_papers', '{"scope_intro": "RAMSITA 2028 invites high-quality original research manuscripts detailing pioneering technological advances, theoretical models, and real-world implementations across 7 primary tracks and 1 special doctoral award track. All submitted papers will undergo rigorous double-blind peer review by at least two international domain experts.", "guidelines": ["Manuscripts must be formatted strictly according to the Atlantis Press (Springer Nature) AISR proceedings template.", "Paper length should be between 4 and 6 pages (maximum 8 pages including references, with extra page charges applicable beyond 6 pages).", "Similarity index must be strictly below 15% (with no single source exceeding 3%) evaluated using Turnitin / iThenticate / SimCheck.", "Submissions must be made electronically in PDF format via Microsoft CMT."], "links": [{"name": "Springer Nature AISR LaTeX Template", "desc": "Official Atlantis Press LaTeX authoring kit with bibtex and sample paper files.", "url": "https://www.atlantis-press.com/proceedings/series/aisr/publishing", "type": "zip", "badge": "LaTeX Kit"}, {"name": "Microsoft Word Template (.docx)", "desc": "Standard Springer Nature AISR MS Word formatting guideline document.", "url": "https://www.atlantis-press.com/proceedings/series/aisr/publishing", "type": "docx", "badge": "Word Template"}, {"name": "Microsoft CMT Submission Portal", "desc": "Official submission management platform for RAMSITA 2028 author paper uploading.", "url": "https://cmt3.research.microsoft.com", "type": "portal", "badge": "CMT System"}, {"name": "Publication Ethics & Malpractice Policy", "desc": "COPE-compliant ethical principles, plagiarism threshold (<15%), and authorship criteria.", "url": "https://www.springernature.com/gp/policies/editorial-policies", "type": "policy", "badge": "COPE Ethics"}]}'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('about', '{"overview": "Acropolis Institute of Technology and Research (AITR), situated in Indore, Madhya Pradesh, commenced its journey of excellence in 2005. Spread across 5 Lakh square feet of lush green eco-friendly campus with globally acknowledged modern infrastructure, the institute is dedicated to high-standard education and interdisciplinary scientific research.", "rankings": [{"title": "Top 50 in India (ARIIA)", "desc": "Ranked in top 50 private institutions by Govt. of India for Innovation Achievements."}, {"title": "20+ Years Excellence", "desc": "Pioneering technical and managerial education in Central India since 2005."}, {"title": "NAAC & NBA Accredited", "desc": "Recognized for uncompromising quality standards and outcome-based engineering education."}, {"title": "Host Departments", "desc": "Department of CSIT and Department of CSE (Cyber Security)."}], "city": {"title": "Welcome to Indore \u2014 India''s Cleanest City", "desc": "Awarded India''s cleanest city for 7 consecutive years under Swachh Survekshan, Indore is the cultural and commercial capital of Central India. Famous for its culinary hubs like Sarafa Bazaar and Chappan Dukan, as well as historic Rajwada Palace and Devi Ahilyabai Holkar Airport, Indore warmly welcomes international scholars."}, "department_spotlights": [{"id": "dept-csit", "name": "Department of Computer Science & Information Technology (CSIT)", "head": "Dr. Shilpa Bhalerao (Head of Department)", "description": "Pioneering cutting-edge technical education in Artificial Intelligence, Machine Learning, and Information Systems. The department houses dedicated research labs, 35+ published patents, and active international research collaborations.", "highlights": ["Center of Excellence in AI & IoT", "120+ International Scopus/Springer Publications", "Industry Collaborations with Microsoft, AWS & RedHat"], "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"}, {"id": "dept-csec", "name": "Department of Computer Science & Engineering (Cyber Security)", "head": "Dr. Kamal Sethi (Head of Department)", "description": "Dedicated to nurturing global experts in information assurance, digital forensics, threat intelligence, and post-quantum cryptography. Equipped with state-of-the-art cyber range environments and defense testing labs.", "highlights": ["Advanced Cyber Defense & Forensics Range", "Zero-Trust and Post-Quantum Security Research", "National Cyber Security Awareness Programs"], "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80"}]}'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('sponsors', '{"title": "Partner with RAMSITA 2028", "pitch": "Showcase your organization''s leadership in sustainability, intelligent technologies, and engineering innovation to an audience of 1,500+ researchers, academic heads, and industry innovators.", "stats": [{"label": "Expected Delegates", "value": "1500\u20132000"}, {"label": "Research Papers Presented", "value": "250+"}, {"label": "Participating Countries", "value": "15+"}, {"label": "Academic & R&D Partners", "value": "50+"}], "packages": [{"name": "Platinum Sponsor", "amount": "\u20b9 1,00,000", "perks": ["Prominent logo on main conference stage backdrop", "Full page color advertisement in Springer Book of Abstracts", "5 Complimentary full delegate passes", "Dedicated promotional booth at venue", "VIP pass to international networking dinner"]}, {"name": "Gold Sponsor", "amount": "\u20b9 50,000", "perks": ["Logo on conference banners and digital brochure", "Half page advertisement in Book of Abstracts", "3 Complimentary delegate passes", "Display stall in exhibition corridor"]}, {"name": "Silver Sponsor", "amount": "\u20b9 25,000", "perks": ["Logo on official conference website and posters", "Quarter page acknowledgment in Book of Abstracts", "2 Complimentary delegate passes"]}]}'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('contact', '{"email": "ramsita@acropolis.in", "phone": "0731-4730111, +91-9425720000", "address": "Acropolis Institute of Technology and Research, Bypass Road, Manglia Square, Manglia, Indore, Madhya Pradesh-453771, India", "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.016335198424!2d75.9405672753282!3d22.79975767933166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631d37446540b9%3A0xc391122a8432b4b4!2sAcropolis%20Institute%20of%20Technology%20and%20Research!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('registration_bank', '{"accountName": "Acropolis Institute of Technology & Research", "accountNumber": "50200052357130", "bankName": "HDFC Bank", "branch": "Trade House, Indore", "ifsc": "HDFC0000036", "upiId": "acropolis@hdfcbank"}'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('registration_notes', '["Registration fee covers full paper publication in Atlantis Press (Springer Nature) AISR series (ISSN: 1951-6851).", "Up to 6 pages allowed per paper under standard fee. Extra pages charged at \u20b91,000 (INR) or 5 (USD) per page (maximum 2 extra pages).", "At least one author of each accepted paper must register with a Full Author Registration fee and present the paper during the conference.", "Hybrid Mode available: Authors may present in-person at AITR Indore campus or virtually via video conference.", "Registration includes presentation certificate, delegate conference kit, proceedings download, and conference banquet for physical attendees."]'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO site_settings (key, value) VALUES ('registration_guidelines', '"At least one author must register with Full Registration fee to include the accepted paper in the conference proceedings. Co-authors and attendees may register under the Attendee category. Normal paper length is up to 12 pages in Springer Nature format. Each extra page is charged at \u20b9500 (INR) or $10 (USD)."'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO keynote_speakers (id, name, title, institution, topic, avatar, display_order) VALUES ('sp1', 'Dr. Sudarshan Iyengar', 'Director', 'Annam.ai & IIT Ropar, India', 'Next-Generation Machine Learning & Digital Knowledge Graphs', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO keynote_speakers (id, name, title, institution, topic, avatar, display_order) VALUES ('sp2', 'Dr. M. N. Hoda', 'Director', 'BVICAM, New Delhi, India', 'Sustainable Software Architectures & Intelligent Systems', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO keynote_speakers (id, name, title, institution, topic, avatar, display_order) VALUES ('sp3', 'Prof. (Dr.) Duc-Tan Tran', 'Dean, Faculty of Electrical & Electronic Eng.', 'Phenikaa School of Engineering, Vietnam', 'IoT Sensing & Embedded Intelligent Infrastructure', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO keynote_speakers (id, name, title, institution, topic, avatar, display_order) VALUES ('sp4', 'Dr. Sandeep Shukla', 'Director & Professor', 'IIIT Hyderabad, India', 'Cybersecurity of Critical Infrastructure & Blockchain Governance', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80', 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO keynote_speakers (id, name, title, institution, topic, avatar, display_order) VALUES ('sp5', 'Dr. Brij B. Gupta', 'Distinguished Professor & Director CCRI', 'Asia University, Taiwan', 'Post-Quantum Cryptography & AI Security Protocols', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO keynote_speakers (id, name, title, institution, topic, avatar, display_order) VALUES ('sp6', 'Prof. (Dr.) Jemal Abawajy', 'Professor, Faculty of Science & Engineering', 'Deakin University, Australia', 'Distributed Cloud Systems & Edge Computing Resiliency', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80', 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO important_dates (id, event, date, status, highlight, display_order) VALUES ('d1', 'Call for Papers Submission Opens', 'August 15, 2027', 'Upcoming', 0, 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO important_dates (id, event, date, status, highlight, display_order) VALUES ('d2', 'Special Track & PhD Thesis Nomination Deadline', 'November 15, 2027', 'Upcoming', 0, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO important_dates (id, event, date, status, highlight, display_order) VALUES ('d3', 'Full Paper Submission Closes', 'December 15, 2027', 'Upcoming', 1, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO important_dates (id, event, date, status, highlight, display_order) VALUES ('d4', 'Notification of Acceptance', 'January 10, 2028', 'Upcoming', 0, 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO important_dates (id, event, date, status, highlight, display_order) VALUES ('d5', 'Early Bird Registration Closes', 'January 20, 2028', 'Upcoming', 0, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO important_dates (id, event, date, status, highlight, display_order) VALUES ('d6', 'Camera-Ready Manuscript Due', 'January 28, 2028', 'Upcoming', 0, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO important_dates (id, event, date, status, highlight, display_order) VALUES ('d7', 'Conference Dates (Hybrid)', 'February 11–12, 2028', 'Upcoming', 1, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO tracks (id, number, name, scope, color, display_order) VALUES ('track-1', '01', 'Generative AI and Intelligent Systems', 'Generative AI, Large Language Models (LLMs), Agentic AI, Multimodal Intelligence, Explainable AI (XAI), Deep Learning, Reinforcement Learning, Intelligent Automation, and Responsible AI.', 'from-blue-600 to-indigo-600', 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO tracks (id, number, name, scope, color, display_order) VALUES ('track-2', '02', 'Quantum Computing & Emerging Paradigms', 'Quantum algorithms, Quantum Machine Learning (QML), Quantum communication, Quantum cryptography, Quantum simulation, Hybrid quantum-classical computing, and Post-quantum technologies.', 'from-purple-600 to-indigo-700', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO tracks (id, number, name, scope, color, display_order) VALUES ('track-3', '03', 'Cybersecurity, Privacy & Trustworthy Computing', 'AI-driven cyber threat detection, Network security, Blockchain, Digital forensics, Privacy-preserving technologies, Secure communication, Post-quantum cryptography, and Zero-trust architectures.', 'from-cyan-600 to-blue-700', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO tracks (id, number, name, scope, color, display_order) VALUES ('track-4', '04', 'Green Computing & Energy-Efficient Technologies', 'Green AI, Low-power computing, Energy-efficient algorithms, Sustainable data centres, Cloud energy optimisation, Edge computing, Carbon-aware computing, and Renewable energy integration.', 'from-emerald-600 to-teal-700', 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO tracks (id, number, name, scope, color, display_order) VALUES ('track-5', '05', 'IoT, Cyber-Physical Systems & Smart Tech', 'IoT, Industrial IoT (IIoT), Smart agriculture, Smart cities, Intelligent sensing, Embedded systems, Digital twins, Edge intelligence, and AI-enabled cyber-physical infrastructure.', 'from-teal-600 to-emerald-700', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO tracks (id, number, name, scope, color, display_order) VALUES ('track-6', '06', 'Advanced Computing & Distributed Intelligence', 'Big data analytics, Cloud and fog computing, Distributed systems, High-performance computing (HPC), Advanced algorithms, Data engineering, Knowledge discovery, and Intelligent information systems.', 'from-sky-600 to-blue-800', 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO tracks (id, number, name, scope, color, display_order) VALUES ('track-7', '07', 'AI Applications & Interdisciplinary Innovations', 'AI applications in healthcare, education, agriculture, finance, engineering, and industrial automation, including multimodal learning and domain-specific intelligent solutions.', 'from-emerald-500 to-cyan-700', 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO tracks (id, number, name, scope, color, display_order) VALUES ('track-8', 'SP', 'Special Track: Best PhD Thesis Award', 'Dedicated presentation track and cash awards for completed or near-completion doctoral dissertations in computer science, intelligent systems, and engineering.', 'from-amber-500 to-orange-600', 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO latest_news (id, date, category, title, text, image, link, display_order) VALUES ('news-1', 'August 15, 2027', 'Call For Papers', 'Microsoft CMT Submission Portal is Officially Open', 'Authors are invited to submit original, unpublished research papers up to 6 pages in Springer Nature AISR format through the Microsoft CMT portal.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80', 'https://cmt3.research.microsoft.com', 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO latest_news (id, date, category, title, text, image, link, display_order) VALUES ('news-2', 'July 20, 2027', 'Proceedings', 'Springer Nature AISR Series Publication Agreement Signed', 'Proceedings of RAMSITA 2028 will be published in Atlantis Press (part of Springer Nature Group) AISR Series (ISSN: 1951-6851), indexed in major academic databases.', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80', '#', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO latest_news (id, date, category, title, text, image, link, display_order) VALUES ('news-3', 'June 10, 2027', 'Journal Indexing', 'Fast-Track Scopus Journal Consideration for High-Scoring Papers', 'Top selected 15% high-scoring accepted papers will be invited for submission of extended versions to BJIT - International Journal of Information Technology (Springer Nature, Scopus Indexed).', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80', '#', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO latest_news (id, date, category, title, text, image, link, display_order) VALUES ('news-4', 'May 01, 2027', 'PhD Award', 'Call for Nominations: Best Doctoral Dissertation Award 2028', 'Scholars who have completed or defended their doctoral dissertation in 2025–2027 in computer science and related fields are eligible to compete for prestigious cash awards and citations.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80', '#', 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO previous_events (id, year, title, subtitle, "desc", image, link, stats, display_order) VALUES ('pe-1', '2026', 'RAMSITA 2026 (1st Edition)', 'International Conference on Recent Advancement & Modernization in Sustainable Intelligent Technologies & Applications', 'Organized in Hybrid Mode at AITR Indore with over 180 peer-reviewed research papers presented, delegates from 12 countries, and publication in international proceedings.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80', 'https://ijaitr.in/conference2028/', '180+ Papers • 12 Countries • Atlantis Press', 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO previous_events (id, year, title, subtitle, "desc", image, link, stats, display_order) VALUES ('pe-2', '2027', 'MPCON 2027 (2nd Edition)', 'Madhya Pradesh State Conference on Advanced Innovation in Technology & Research', 'Convened 350+ academicians, 6 keynote symposiums, and special industry roundtable discussions on sustainable AI and regional technological growth.', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80', 'https://www.aitr.ac.in/mpcon2027', '350+ Scholars • 6 Keynotes • 4 Technical Tracks', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO sponsor_logos (id, name, logo, tier, display_order) VALUES ('sl-1', 'Springer Nature', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Springer_Nature_Logo.svg/512px-Springer_Nature_Logo.svg.png', 'Publication Partner', 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO sponsor_logos (id, name, logo, tier, display_order) VALUES ('sl-2', 'Atlantis Press', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Atlantis_Press_logo.png/320px-Atlantis_Press_logo.png', 'Proceedings Publisher', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO sponsor_logos (id, name, logo, tier, display_order) VALUES ('sl-3', 'IEEE MP Section', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/512px-IEEE_logo.svg.png', 'Technical Co-Sponsor', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO sponsor_logos (id, name, logo, tier, display_order) VALUES ('sl-4', 'Computer Society of India (CSI)', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Computer_Society_of_India_Logo.png/220px-Computer_Society_of_India_Logo.png', 'Professional Partner', 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO sponsor_logos (id, name, logo, tier, display_order) VALUES ('sl-5', 'Institution of Electronics and Telecommunication Engineers (IETE)', 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/IETE_logo.png/220px-IETE_logo.png', 'Knowledge Partner', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO sponsor_logos (id, name, logo, tier, display_order) VALUES ('sl-6', 'Acropolis AITR', '/logo.png', 'Organizing Institute', 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO registration_fees (id, category, inr, usd, perks, display_order) VALUES ('fee-0', 'Academic / Research Institute Author', 9000, 180, '["Full Paper Publication in Proceedings", "Presentation Certificate", "Conference Kit & Materials", "Access to All Sessions & Keynotes"]'::jsonb, 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO registration_fees (id, category, inr, usd, perks, display_order) VALUES ('fee-1', 'Industry Participant / Author', 12000, 220, '["Full Paper Publication in Proceedings", "Presentation Certificate", "Industry Networking Access", "Conference Kit & Banquet"]'::jsonb, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO registration_fees (id, category, inr, usd, perks, display_order) VALUES ('fee-2', 'Conference Attendee / Co-Author / PhD Award', 2000, 50, '["Attendance Certificate", "Access to All Hybrid Sessions", "Delegate Pass & Materials"]'::jsonb, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO registration_fees (id, category, inr, usd, perks, display_order) VALUES ('fee-3', 'Poster Presentation Track', 1500, 50, '["Poster Space & Digital Display", "Presentation Certificate", "Session Access"]'::jsonb, 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-0', 'chiefPatron', 'Er. Ashok Sojatia', 'Chief Patron', 'Chairman BOG, Acropolis Group of Institutions', 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-1', 'patrons', 'Er. Ashish Sojatia', 'Patron', 'Group Chairman, Acropolis Group of Institutions', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-2', 'patrons', 'Shri Anand Sojatia', 'Patron', 'Secretary, Acropolis Group of Institutions, Indore', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-3', 'patrons', 'Er. Gaurav Sojatia', 'Patron', 'Chairman, Acropolis Group of Institutions, Indore', 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-4', 'chairs', 'Dr. Shilpa Bhalerao', 'General Conference Chair & Lead Editor', 'Professor & Head, Department of CSIT, AITR Indore', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-5', 'chairs', 'Dr. Brij Bhushan Gupta', 'Conference Co-Chair', 'Distinguished Professor & Director CCRI, Asia University, Taiwan', 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-6', 'chairs', 'Dr. Praveen Gupta', 'Conference Co-Chair', 'Professor, AITR Indore', 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-7', 'chairs', 'Dr. Vandana Kate', 'Conference Co-Chair', 'Professor, AITR Indore', 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-8', 'steering', 'Dr. S. C. Sharma', 'Director, AITR Indore', NULL, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-9', 'steering', 'Dr. Kamal Sethi', 'Professor, AITR Indore', NULL, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-10', 'steering', 'Dr. U. B. S. Chandrawat', 'Professor & Head EC, AITR', NULL, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-11', 'steering', 'Dr. Prashant Lakkadwala', 'Professor & Head, AITR', NULL, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-12', 'steering', 'Dr. Namrata Tapaswi', 'Professor & Head CSE (AI&ML)', NULL, 12) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-13', 'steering', 'Dr. Jayant Awasthi', 'Professor, AITR', NULL, 13) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-14', 'steering', 'Prof. Geeta Santhosh', 'Professor, AITR', NULL, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-15', 'steering', 'Dr. Amit Kumar Marwah', 'Professor, AITR', NULL, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-16', 'advisoryInternational', 'Dr. Duc-Tan Tran', NULL, 'Phenikaa School of Engineering, Vietnam', 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-17', 'advisoryInternational', 'Dr. Jemal Abawajy', NULL, 'Deakin University, Australia', 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-18', 'advisoryInternational', 'Dr. C. Jayakumari', NULL, 'Muscat, Oman', 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-19', 'advisoryInternational', 'Mr. Sidhanta De', NULL, 'Singapore', 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-20', 'advisoryInternational', 'Mr. Manish Gehlot', NULL, 'Infosys Consulting, USA', 20) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-21', 'advisoryInternational', 'Ms. Archana Gehlot', NULL, 'Founder, Asmakam Life University, USA', 21) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-22', 'advisoryNational', 'Dr. Sudarshan Iyengar', NULL, 'IIT Ropar', 22) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-23', 'advisoryNational', 'Dr. P. C. Deshmukh', NULL, 'IIT Tirupati & RV University', 23) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-24', 'advisoryNational', 'Dr. Jimson Mathew', NULL, 'IIT Patna', 24) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-25', 'advisoryNational', 'Dr. Aruna Tiwari', NULL, 'IIT Indore', 25) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-26', 'advisoryNational', 'Dr. Santosh Vishwakarma', NULL, 'IIT Indore', 26) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-27', 'advisoryNational', 'Dr. Abhay Kumar', NULL, 'Director, IIIT Agartala', 27) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-28', 'advisoryNational', 'Dr. Ram Bilas Pachori', NULL, 'Director, IIIT Kottayam', 28) ON CONFLICT (id) DO NOTHING;
INSERT INTO committee_members (id, category, name, role, affiliation, display_order) VALUES ('com-29', 'advisoryNational', 'Dr. Maya Ingle', NULL, 'Ex-Director DDUK, Indore', 29) ON CONFLICT (id) DO NOTHING;
INSERT INTO gallery_photos (id, title, category, image, caption, display_order) VALUES ('g1', 'Inaugural Ceremony RAMSITA', 'Inauguration', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80', 'Dignitaries lighting the ceremonial lamp during the opening ceremony.', 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO gallery_photos (id, title, category, image, caption, display_order) VALUES ('g2', 'Keynote Address on Intelligent Systems', 'Keynotes', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80', 'International keynote speaker addressing academic delegates.', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO gallery_photos (id, title, category, image, caption, display_order) VALUES ('g3', 'Technical Session & Paper Presentation', 'Sessions', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80', 'Researchers presenting peer-reviewed papers during the technical track.', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO gallery_photos (id, title, category, image, caption, display_order) VALUES ('g4', 'Best PhD Thesis Award Presentation', 'Awards', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80', 'Conferring the Best Doctoral Dissertation Award to scholar.', 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO gallery_photos (id, title, category, image, caption, display_order) VALUES ('g5', 'International Advisory Panel Discussion', 'Sessions', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80', 'Global panel discussing sustainable computing and ethical AI paradigms.', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO gallery_photos (id, title, category, image, caption, display_order) VALUES ('g6', 'Campus Greenery & Architecture', 'Campus', 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80', 'State-of-the-art academic blocks at Acropolis Institute Indore.', 5) ON CONFLICT (id) DO NOTHING;