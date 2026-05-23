// Script pour rendre le numéro de facture modifiable
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Rendre le champ de numéro de facture modifiable (ligne 1876)
content = content.replace(
  /<div class="fg"><label class="fl">N° Document<\/label><input class="inp" id="nf-n" readonly><\/div>/,
  '<div class="fg"><label class="fl">N° Document</label><input class="inp" id="nf-n" placeholder="Généré automatiquement"></div>'
);

// 2. Ajouter un bouton pour régénérer automatiquement si vide
content = content.replace(
  /(<button class="btn btn-o" onclick="closeModal\('addFacture'\)">Annuler<\/button>\s*<button class="btn btn-g" id="btn-emettre" onclick="addFacture\(\)">🧾 Émettre la facture<\/button>)/,
  '<button class="btn btn-o btn-sm" onclick="autoGenerateInvoiceNumber()" style="margin-right:10px;">🔄 Régénérer N°</button>\n  $1'
);

// 3. Ajouter la fonction de régénération automatique
const autoGenFunction = `
// Fonction pour régénérer automatiquement le numéro de facture
function autoGenerateInvoiceNumber() {
  var nfN = document.getElementById('nf-n');
  if(!nfN) return;
  var docType = _docType || 'facture';
  var prefix = docType === 'devis' ? 'DEV' : docType === 'avoir' ? 'AVO' : 'FAC';
  var year = new Date().getFullYear();
  var nextNum = docType === 'devis' ? nextDevis : nextF;
  nfN.value = prefix + '-' + year + '-' + String(nextNum).padStart(3, '0');
  toast('🔄 Numéro régénéré : ' + nfN.value);
}
`;

// Insérer avant la fonction addFacture
content = content.replace(
  /(function addFacture\(\))/,
  autoGenFunction + '\n\n$1'
);

// 4. Modifier la fonction d'ouverture du modal pour générer automatiquement si vide
content = content.replace(
  /(function openModal\(id\)\{[^}]*if\(id==='addFacture'\)\{[\s\S]*?_lignesFacture=\[\];[\s\S]*?_ligneCounter=0;)/,
  `$1
  // Générer automatiquement le numéro si vide
  var nfN = document.getElementById('nf-n');
  if(nfN && !nfN.value) {
    var docType = _docType || 'facture';
    var prefix = docType === 'devis' ? 'DEV' : docType === 'avoir' ? 'AVO' : 'FAC';
    var year = new Date().getFullYear();
    var nextNum = docType === 'devis' ? nextDevis : nextF;
    nfN.value = prefix + '-' + year + '-' + String(nextNum).padStart(3, '0');
  }`
);

// 5. Mettre à jour la fonction switchDocType pour régénérer le numéro lors du changement de type
content = content.replace(
  /(function switchDocType\(radio\)\{[\s\S]*?var title = document\.getElementById\('fact-modal-title'\);[\s\S]*?var btn = document\.getElementById\('btn-emettre'\);)/,
  `$1
  // Régénérer le numéro lors du changement de type
  var nfN = document.getElementById('nf-n');
  if(nfN && !_editFactureNum) {
    var prefix = _docType === 'devis' ? 'DEV' : _docType === 'avoir' ? 'AVO' : 'FAC';
    var year = new Date().getFullYear();
    var nextNum = _docType === 'devis' ? nextDevis : nextF;
    nfN.value = prefix + '-' + year + '-' + String(nextNum).padStart(3, '0');
  }`
);

// Sauvegarder le fichier modifié
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Numéro de facture maintenant modifiable !');
console.log('- Champ "N° Document" éditable');
console.log('- Génération automatique si vide');
console.log('- Bouton de régénération ajouté');
console.log('- Régénération automatique lors du changement de type');
