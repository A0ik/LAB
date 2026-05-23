module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, cc, subject, html, text } = req.body;
  if (!to || !subject) return res.status(400).json({ error: 'Missing required fields: to, subject' });

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return res.status(500).json({ error: 'Email service not configured' });

  const fromEmail = process.env.FROM_EMAIL || 'noreply@liveandbest.fr';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `Live&Best Consulting <${fromEmail}>`,
        to: Array.isArray(to) ? to : [to],
        ...(cc ? { cc: Array.isArray(cc) ? cc : [cc] } : {}),
        subject,
        html: html || `<p>${text || ''}</p>`,
        ...(text ? { text } : {})
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.message || 'Email sending failed' });
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
};
