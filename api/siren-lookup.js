module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query parameter: q' });

  const siren = q.replace(/\s/g, '');
  if (!/^\d{9,14}$/.test(siren)) return res.status(400).json({ error: 'SIREN invalide (9 chiffres) ou SIRET (14 chiffres)' });

  try {
    const sirenOnly = siren.slice(0, 9);
    const url = `https://recherche-entreprises.api.gouv.fr/search?q=${sirenOnly}&mtq=1&page=1&per_page=1`;

    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!response.ok) return res.status(response.status).json({ error: 'Erreur lors de la recherche' });

    const data = await response.json();
    const result = data.results?.[0];
    if (!result) return res.status(404).json({ error: 'Entreprise non trouvée' });

    const siege = result.siege || {};
    return res.status(200).json({
      success: true,
      siren: result.siren,
      siret: siege.siret,
      nom: result.nom_complet || result.nom_raison_sociale,
      forme_juridique: result.forme_juridique,
      naf: result.activite_principale,
      adresse: siege.adresse,
      code_postal: siege.code_postal,
      ville: siege.libelle_commune,
      statut: result.etat_administratif === 'A' ? 'Actif' : 'Inactif',
      date_creation: result.date_creation,
      dirigeants: (result.dirigeants || []).map(function(d) {
        return { nom: [d.nom, d.prenoms].filter(Boolean).join(' '), qualite: d.qualite };
      })
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur: ' + err.message });
  }
};
