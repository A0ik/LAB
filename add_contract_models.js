// Script pour ajouter les modèles de contrats génériques
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remplacer les exemples vides par des modèles complets
const oldExemples = /var exemples = \{[\s\S]*?\};/;

const newExemples = `var exemples = {
    "CDD_CLASSIQUE":        {type_contrat:"CDD", convention:"Restauration rapide IDCC 1501", entreprise_nom:"RESTO EXEMPLE SAS", entreprise_siret:"123 456 789 00012", entreprise_adresse:"12 rue de la Paix, 75001 Paris", code_naf:"5610A", representant:"Jean DUPONT", qualite_representant:"Gérant", salarie_civilite:"M.", salarie_nom:"Martin Pierre", salarie_naissance:"15/03/1990", salarie_lieu_naissance:"Paris 15e", salarie_nationalite:"Française", salarie_adresse:"3 rue des Lilas, 75003 Paris", salarie_nss:"1 90 03 75 123 456 78", poste:"Serveur", classification:"Employe Niveau II", salaire_brut:"1830,00", heures_semaine:"35", heures_mois:"151,67", taux_horaire:"12,06", date_debut:"2026-06-01", heure_embauche:"09:00", lieu_travail:"12 rue de la Paix, 75001 Paris", ville_contrat:"Paris", service_sante:"Medecin du travail - PMI", duree_cdd:"2", date_fin:"2026-08-31", motif_cdd:"accroissement temporaire d'activite - saison estivale", nom_chantier:"", adresse_chantier:"", nature_travaux:""},
    "CDD_SAISONNIER":       {type_contrat:"CDD", convention:"Hôtellerie-Restauration IDCC 1979", entreprise_nom:"HOTEL PLAGE SARL", entreprise_siret:"987 654 321 00034", entreprise_adresse:"Boulevard de la Plage, 06600 Antibes", code_naf:"5510A", representant:"Marie DURAND", qualite_representant:"Gérante", salarie_civilite:"Mme", salarie_nom:"Sophie Bernard", salarie_naissance:"22/07/1995", salarie_lieu_naissance:"Nice 06", salarie_nationalite:"Française", salarie_adresse:"15 avenue du Soleil, 06000 Nice", salarie_nss:"2 95 07 06 234 567 89", poste:"Employée de restauration", classification:"Employe Niveau I", salaire_brut:"1750,00", heures_semaine:"35", heures_mois:"151,67", taux_horaire:"11,54", date_debut:"2026-06-15", heure_embauche:"08:00", lieu_travail:"Boulevard de la Plage, 06600 Antibes", ville_contrat:"Antibes", service_sante:"Medecin du travail - SST", duree_cdd:"4", date_fin:"2026-10-15", motif_cdd:"saison touristique estivale", nom_chantier:"", adresse_chantier:"", nature_travaux:""},
    "CDD_REMPLACEMENT":     {type_contrat:"CDD", convention:"Syntec IDCC 1486", entreprise_nom:"DIGITAL SERVICES SAS", entreprise_siret:"456 789 123 00056", entreprise_adresse:"8 rue de la Tech, 75009 Paris", code_naf:"6201Z", representant:"Lucas PETIT", qualite_representant:"President", salarie_civilite:"M.", salarie_nom:"Thomas Martin", salarie_naissance:"10/12/1988", salarie_lieu_naissance:"Lyon 06", salarie_nationalite:"Française", salarie_adresse:"42 rue de la République, 69002 Lyon", salarie_nss:"1 88 12 69 345 678 90", poste:"Developpeur Fullstack", classification:"Cadre Niveau B", salaire_brut:"3200,00", heures_semaine:"35", heures_mois:"151,67", taux_horaire:"21,10", date_debut:"2026-06-01", heure_embauche:"09:30", lieu_travail:"8 rue de la Tech, 75009 Paris", ville_contrat:"Paris", service_sante:"Medecin du travail - Interentreprises", duree_cdd:"6", date_fin:"2026-12-01", motif_cdd:"remplacement de Madame Dubois absente pour congé maternel", nom_chantier:"", adresse_chantier:"", nature_travaux:""},
    "CDI_TEMPS_PLEIN":      {type_contrat:"CDI", convention:"Expertise Comptable IDCC 787", entreprise_nom:"CABINET COMPTA EXPERT SAS", entreprise_siret:"789 456 123 00078", entreprise_adresse:"15 avenue de la Comptabilité, 69003 Lyon", code_naf:"6920Z", representant:"François LEROY", qualite_representant:"Associé Gérant", salarie_civilite:"Mme", salarie_nom:"Claire Dubois", salarie_naissance:"05/09/1992", salarie_lieu_naissance:"Lyon 05", salarie_nationalite:"Française", salarie_adresse:"7 rue du Commerce, 69006 Lyon", salarie_nss:"2 92 09 69 456 789 01", poste:"Comptable H/F", classification:"Employe Niveau IV", salaire_brut:"2400,00", heures_semaine:"35", heures_mois:"151,67", taux_horaire:"15,82", date_debut:"2026-07-01", heure_embauche:"08:30", lieu_travail:"15 avenue de la Comptabilité, 69003 Lyon", ville_contrat:"Lyon", service_sante:"Medecin du travail - AMETIS", duree_cdd:"", date_fin:"", motif_cdd:"", nom_chantier:"", adresse_chantier:"", nature_travaux:""},
    "CDI_TEMPS_PARTIEL":   {type_contrat:"CDI", convention:"Commerce de détail IDCC 1505", entreprise_nom:"SUPERMARCHE DISCOUNT SARL", entreprise_siret:"321 654 987 00090", entreprise_adresse:"ZAC Commercial, 33000 Bordeaux", code_naf:"4711F", representant:"Pierre MERCIER", qualite_representant:"Gérant", salarie_civilite:"M.", salarie_nom:"Jacques Rousseau", salarie_naissance:"18/03/1985", salarie_lieu_naissance:"Bordeaux 33", salarie_nationalite:"Française", salarie_adresse:"22 rue des Vignes, 33000 Bordeaux", salarie_nss:"1 85 03 33 567 890 12", poste:"Employé Polyvalent H/F", classification:"Employe Niveau I", salaire_brut:"1200,00", heures_semaine:"20", heures_mois:"86,67", taux_horaire:"13,84", date_debut:"2026-06-15", heure_embauche:"14:00", lieu_travail:"ZAC Commercial, 33000 Bordeaux", ville_contrat:"Bordeaux", service_sante:"Medecin du travail - PST", duree_cdd:"", date_fin:"", motif_cdd:"", nom_chantier:"", adresse_chantier:"", nature_travaux:""},
    "CDI_CHANTIER":        {type_contrat:"CDI_CHANTIER", convention:"BTP Ouvriers (> 10 sal.) IDCC 1597", entreprise_nom:"BTP TRAVAUX PLUS SARL", entreprise_siret:"654 321 789 00123", entreprise_adresse:"Zone Industrielle, 33000 Bordeaux", code_naf:"4120A", representant:"Paul BERNARD", qualite_representant:"Gérant", salarie_civilite:"M.", salarie_nom:"Michel Petit", salarie_naissance:"25/08/1980", salarie_lieu_naissance:"Bordeaux 33", salarie_nationalite:"Française", salarie_adresse:"12 rue du Travail, 33000 Bordeaux", salarie_nss:"1 80 08 33 678 901 23", poste:"Maçon", classification:"Ouvrier Niveau III", salaire_brut:"2100,00", heures_semaine:"39", heures_mois:"169", taux_horaire:"12,43", date_debut:"2026-06-01", heure_embauche:"07:00", lieu_travail:"Chantier Residence Les Jardins", ville_contrat:"Bordeaux", service_sante:"OPPBTP", duree_cdd:"", date_fin:"", motif_cdd:"", nom_chantier:"Résidence Les Jardins", adresse_chantier:"45 avenue des Fleurs, 33000 Bordeaux", nature_travaux:"Construction batiment R+3 avec sous-sol"},
    "CDI_INTERMITTENT":    {type_contrat:"CDI_INTERMITTENT", convention:"Hôtellerie-Restauration IDCC 1979", entreprise_nom:"RESTAURANT GOURMET SARL", entreprise_siret:"987 654 321 00145", entreprise_adresse:"Place Gastronomique, 69001 Lyon", code_naf:"5610A", representant:"Jean-Pierre CUISINIER", qualite_representant:"Chef Cuisinier", salarie_civilite:"M.", salarie_nom:"Louis Serveur", salarie_naissance:"12/05/1993", salarie_lieu_naissance:"Lyon 02", salarie_nationalite:"Française", salarie_adresse:"8 rue du Restaurant, 69005 Lyon", salarie_nss:"1 93 05 69 789 012 34", poste:"Serveur H/F", classification:"Employe Niveau III", salaire_brut:"1950,00", heures_semaine:"26", heures_mois:"113", taux_horaire:"17,26", date_debut:"2026-07-01", heure_embauche:"18:00", lieu_travail:"Place Gastronomique, 69001 Lyon", ville_contrat:"Lyon", service_sante:"Medecin du travail - SST", duree_cdd:"", date_fin:"", motif_cdd:"", nom_chantier:"", adresse_chantier:"", nature_travaux:""},
    "APPRENTISSAGE":       {type_contrat:"APPRENTISSAGE", convention:"Boulangerie IDCC 843", entreprise_nom:"BOULANGERIE TRADITION SARL", entreprise_siret:"789 456 123 00167", entreprise_adresse:"12 rue du Pain, 69006 Lyon", code_naf:"1071C", representant:"Marie BOULANGER", qualite_representant:"Gérante", salarie_civilite:"M.", salarie_nom:"Kevin Apprenti", salarie_naissance:"20/06/2005", salarie_lieu_naissance:"Lyon 06", salarie_nationalite:"Française", salarie_adresse:"5 rue de l'Apprentissage, 69007 Lyon", salarie_nss:"1 05 06 69 890 123 45", poste:"Apprenti Boulanger Pâtissier", classification:"Apprenti 1ere année", salaire_brut:"850,00", heures_semaine:"35", heures_mois:"151,67", taux_horaire:"5,60", date_debut:"2026-09-01", heure_embauche:"06:00", lieu_travail:"12 rue du Pain, 69006 Lyon", ville_contrat:"Lyon", service_sante:"Medecin du travail - CMA", duree_cdd:"", date_fin:"2029-08-31", motif_cdd:"", nom_chantier:"", adresse_chantier:"", nature_travaux:""},
    "PROFESSIONNALISATION":{type_contrat:"PROFESSIONNALISATION", convention:"Métallurgie IDCC 1106", entreprise_nom:"INDUSTRIE METAL SAS", entreprise_siret:"456 789 123 00189", entreprise_adresse:"Zone Industrielle Nord, 59000 Lille", code_naf:"2511Z", representant:"Robert METAL", qualite_representant:"Directeur", salarie_civilite:"Mme", salarie_nom:"Nathalie Pro", salarie_naissance:"08/11/1997", salarie_lieu_naissance:"Lille 59", salarie_nationalite:"Française", salarie_adresse:"18 rue de l'Industrie, 59000 Lille", salarie_nss:"2 97 11 59 901 234 56", poste:"Soudeuse H/F", classification:"Ouvrier Qualifié Niveau IV", salaire_brut:"1650,00", heures_semaine:"35", heures_mois:"151,67", taux_horaire:"10,88", date_debut:"2026-06-15", heure_embauche:"08:00", lieu_travail:"Zone Industrielle Nord, 59000 Lille", ville_contrat:"Lille", service_sante:"Medecin du travail - AMETIS", duree_cdd:"18", date_fin:"2027-12-15", motif_cdd:"", nom_chantier:"", adresse_chantier:"", nature_travaux:""}
  };`;

content = content.replace(oldExemples, newExemples);

// 2. Ajouter la fonctionnalité de sélection de type de contrat
const selectContratTypeFunction = `
function selectContratType(typeId) {
  _selectedContratType = typeId;
  var data = window._contratExemples ? window._contratExemples[typeId] : null;
  if(!data) return;

  // Pré-remplir les champs du contrat avec les données de l'exemple
  function set(id, val) { var el = document.getElementById(id); if(el && val) el.value = val; }

  set('ct-type-contrat', data.type_contrat || '');
  set('ct-convention', data.convention || '');
  set('ct-entreprise-nom', data.entreprise_nom || '');
  set('ct-entreprise-siret', data.entreprise_siret || '');
  set('ct-entreprise-adresse', data.entreprise_adresse || '');
  set('ct-code-naf', data.code_naf || '');
  set('ct-representant', data.representant || '');
  set('ct-qualite-representant', data.qualite_representant || '');
  set('ct-salarie-civilite', data.salarie_civilite || '');
  set('ct-salarie-nom', data.salarie_nom || '');
  set('ct-salarie-naissance', data.salarie_naissance || '');
  set('ct-salarie-lieu-naissance', data.salarie_lieu_naissance || '');
  set('ct-salarie-nationalite', data.salarie_nationalite || '');
  set('ct-salarie-adresse', data.salarie_adresse || '');
  set('ct-salarie-nss', data.salarie_nss || '');
  set('ct-poste', data.poste || '');
  set('ct-classification', data.classification || '');
  set('ct-salaire-brut', data.salaire_brut || '');
  set('ct-heures-semaine', data.heures_semaine || '');
  set('ct-heures-mois', data.heures_mois || '');
  set('ct-taux-horaire', data.taux_horaire || '');
  set('ct-date-debut', data.date_debut || '');
  set('ct-heure-embauche', data.heure_embauche || '');
  set('ct-lieu-travail', data.lieu_travail || '');
  set('ct-ville-contrat', data.ville_contrat || '');
  set('ct-service-sante', data.service_sante || '');
  set('ct-duree-cdd', data.duree_cdd || '');
  set('ct-date-fin', data.date_fin || '');
  set('ct-motif-cdd', data.motif_cdd || '');
  set('ct-nom-chantier', data.nom_chantier || '');
  set('ct-adresse-chantier', data.adresse_chantier || '');
  set('ct-nature-travaux', data.nature_travaux || '');

  toast('✅ Modèle "'+typeId+'" chargé - Personnalisez les champs');
}
`;

// Insérer la fonction après renderContratModeles
content = content.replace(
  /(function previewModeleContrat\(typeId\) \{)/,
  selectContratTypeFunction + '\n\n$1'
);

// 3. Initialiser la variable _selectedContratType
content = content.replace(
  /(var CONTRAT_TYPES = \[[\s\S]*?\];)/,
  '$1\nvar _selectedContratType = null;'
);

// Sauvegarder le fichier modifié
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Modèles de contrats ajoutés avec succès !');
console.log('- 9 modèles de contrats complets créés');
console.log('- Fonction selectContratType() ajoutée');
console.log('- Pré-remplissage automatique des champs');
