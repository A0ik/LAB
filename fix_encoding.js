// Script pour corriger le problème d'encodage
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Remplacer directement le texte problématique
content = content.replace(',大成', '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Encodage corrigé !');
