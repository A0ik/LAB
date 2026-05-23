module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { imageBase64, mimeType, docType } = req.body;
  if (!imageBase64 || !docType) return res.status(400).json({ error: 'Missing imageBase64 or docType' });

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) return res.status(500).json({ error: 'OCR service not configured' });

  const promptFields = docType === 'carte-vitale'
    ? '{"nss":"...","nom":"...","prenom":"..."}'
    : '{"nom":"...","prenom":"...","naissance":"JJ/MM/AAAA","lieu_naissance":"...","nationalite":"..."}';

  const promptText = docType === 'carte-vitale'
    ? 'Carte vitale française: extrais le NSS (format X XX XX XX XXX XXX XX), nom, prenom. Réponds UNIQUEMENT en JSON: ' + promptFields
    : "CNI ou passeport français: extrais nom de famille, prénom, date de naissance (format JJ/MM/AAAA), lieu de naissance, nationalité. Réponds UNIQUEMENT en JSON: " + promptFields;

  const imageMime = mimeType || 'image/jpeg';

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://liveandbest.vercel.app',
        'X-Title': 'Live&Best Consulting'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:${imageMime};base64,${imageBase64}` } },
            { type: 'text', text: promptText }
          ]
        }]
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'OCR failed' });

    const text = data.choices?.[0]?.message?.content || '';
    const cleaned = text.replace(/```json?/gi, '').replace(/```/g, '').trim();
    const match = cleaned.match(/\{[\s\S]*\}/);

    if (!match) return res.status(200).json({ success: false, text });

    try {
      return res.status(200).json({ success: true, data: JSON.parse(match[0]) });
    } catch {
      return res.status(200).json({ success: false, text });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
};
