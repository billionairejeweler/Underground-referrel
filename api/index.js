// api/index.js  (replace your current file with this exact code)
// Simple CommonJS handler for Vercel serverless functions.
// Routes: GET /api/    POST /api/signup

const qs = require('querystring');

function sendJson(res, obj, status = 200) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

// parse JSON body (small helper)
function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { resolve({}); }
    });
  });
}

module.exports = async (req, res) => {
  // get the path after /api
  const url = req.url || '/';
  // Normalize: if Vercel adds a trailing slash, remove querystring
  const path = url.split('?')[0];

  // Health / root of api
  if (req.method === 'GET' && (path === '/' || path === '/index' || path === '/')) {
    return sendJson(res, { ok: true, message: 'Referral API is live (GET /api/)' });
  }

  // Signup route: POST /api/signup
  if (req.method === 'POST' && path === '/signup') {
    const body = await parseBody(req);
    const name = body.name || body.username || null;
    const cashapp = body.cashapp || body.cashtag || null;
    if (!name || !cashapp) {
      return sendJson(res, { error: 'send JSON { "name": "YourName", "cashapp": "$yourtag" }' }, 400);
    }
    // For now we just echo back (later we will save to Supabase)
    console.log('New signup:', name, cashapp);
    return sendJson(res, { success: true, message: `Welcome ${name}! CashApp saved: ${cashapp}` });
  }

  // Unknown route under /api -> return 404
  return sendJson(res, { error: 'not found under /api' }, 404);
};
