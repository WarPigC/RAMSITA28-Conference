import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sanitizeHtml from 'sanitize-html';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const DATA_FILE = path.join(__dirname, 'data', 'content.json');
const BACKUPS_DIR = path.join(__dirname, 'data', 'backups');

if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

// Sanitization helper
const sanitizeOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    span: ['class', 'style'],
    div: ['class', 'style'],
    p: ['class', 'style']
  },
  selfClosing: ['img', 'br', 'hr'],
  allowedSchemes: ['http', 'https', 'mailto', 'tel']
};

function deepSanitize(obj) {
  if (typeof obj === 'string') {
    // If it looks like HTML, sanitize it; otherwise return trimmed text
    return sanitizeHtml(obj, sanitizeOptions);
  } else if (Array.isArray(obj)) {
    return obj.map(item => deepSanitize(item));
  } else if (typeof obj === 'object' && obj !== null) {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = deepSanitize(value);
    }
    return cleaned;
  }
  return obj;
}

// GET /api/content
app.get('/api/content', (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ error: 'Content file not found' });
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error('Error reading content:', err);
    res.status(500).json({ error: 'Failed to read content', details: err.message });
  }
});

// POST /api/content (Save & Sanitize)
app.post('/api/content', (req, res) => {
  try {
    const rawPayload = req.body;
    if (!rawPayload || typeof rawPayload !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // 1. Sanitize to prevent malicious XSS or broken tags
    const sanitized = deepSanitize(rawPayload);

    // 2. Create automated backup of existing file
    if (fs.existsSync(DATA_FILE)) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(BACKUPS_DIR, `content_${timestamp}.json`);
      fs.copyFileSync(DATA_FILE, backupPath);
    }

    // 3. Write sanitized content to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(sanitized, null, 2), 'utf-8');

    res.json({
      success: true,
      message: 'Content updated and sanitized successfully',
      data: sanitized
    });
  } catch (err) {
    console.error('Error saving content:', err);
    res.status(500).json({ error: 'Failed to save content', details: err.message });
  }
});

// Serve frontend in production
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`RAMSITA 2028 Content Server running on port ${PORT}`);
});
