#!/usr/bin/env node
// Run this whenever you add or delete photos:
//   node photos/generate-config.js

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'images');
const PIN  = '6402'; // change here if you update the pin

function listJpgs(dir) {
  return fs.readdirSync(path.join(ROOT, dir))
    .filter(f => /\.(jpg|jpeg)$/i.test(f) && !f.startsWith('._'))
    .sort();
}

const nichithartham = listJpgs('Nichithartham');
const reception     = listJpgs('RECEPTION GROUPS');
const wedding       = listJpgs('Wedding');

const out = `// ─────────────────────────────────────────────────────────
//  AUTO-GENERATED — do not edit by hand.
//  To update: node photos/generate-config.js
// ─────────────────────────────────────────────────────────
var PHOTOS_PIN = "${PIN}";

var NICHITHARTHAM_FILES = ${JSON.stringify(nichithartham, null, 2)};

var RECEPTION_FILES = ${JSON.stringify(reception, null, 2)};

var WEDDING_FILES = ${JSON.stringify(wedding, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'config.js'), out);
console.log('✓ config.js updated');
console.log(`  Nichithartham : ${nichithartham.length} photos`);
console.log(`  Reception     : ${reception.length} photos`);
console.log(`  Wedding       : ${wedding.length} photos`);
