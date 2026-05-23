// Script pour réinitialiser les données de test dans index.html
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Réinitialiser clients (ligne 2560-2573)
content = content.replace(
  /let clients=\s*\[\s*\{[^}]+\}[\s\S]*?\];/,
  'let clients=[];'
);

// 2. Réinitialiser factures (ligne 2581-2593)
content = content.replace(
  /let factures=\s*\[\s*\{[^}]+\}[\s\S]*?\];/,
  'let factures=[];'
);

// 3. Réinitialiser nextF à 1
content = content.replace(
  /let nextF=\d+;/,
  'let nextF=1;'
);

// 4. Réinitialiser relances
content = content.replace(
  /const relances=\s*\[\s*\{[^}]+\}[\s\S]*?\];/,
  'const relances=[];'
);

// 5. Réinitialiser bpData
content = content.replace(
  /const bpData=\s*\[[\s\S]*?\];/,
  'const bpData=[];'
);

// 6. Réinitialiser lmData
content = content.replace(
  /const lmData=\s*\[\s*\{[^}]+\}[\s\S]*?\];/,
  'const lmData=[];'
);

// 7. Réinitialiser mCA (statistiques CA)
content = content.replace(
  /const mCA=\s*\[[\s\S]*?\];/,
  'const mCA=[0];'
);

// 8. Réinitialiser mFact (statistiques factures)
content = content.replace(
  /const mFact=\s*\[[\s\S]*?\];/,
  'const mFact=[0];'
);

// 9. Réinitialiser socialData
content = content.replace(
  /let socialData\s*=\s*\[[\s\S]*?\];/,
  'let socialData=[];'
);

// 10. Réinitialiser agendaEvents (recherche la variable)
content = content.replace(
  /let agendaEvents\s*=\s*\[[\s\S]*?\];/,
  'let agendaEvents=[];'
);

// 11. Réinitialiser salariesData
content = content.replace(
  /let salariesData\s*=\s*\[[\s\S]*?\];/,
  'let salariesData=[];'
);

// 12. Réinitialiser contraHistory
content = content.replace(
  /let contraHistory\s*=\s*\[[\s\S]*?\];/,
  'let contraHistory=[];'
);

// Sauvegarder le fichier modifié
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Données réinitialisées avec succès !');
console.log('- clients, factures, relances: vidés');
console.log('- nextF: réinitialisé à 1');
console.log('- socialData, agendaEvents, salariesData, contraHistory: vidés');
console.log('- Statistiques mCA et mFact: réinitialisées');
