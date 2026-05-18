const fs = require('fs');

const csv = fs.readFileSync('Soil-Climate-data.csv', 'utf8');
const lines = csv.split('\n').filter(l => l.trim().length > 0);
const headers = lines[0].split(',');

const cropIndex = headers.indexOf('Crop_Type');
const soilIndex = headers.indexOf('Soil_Type');
const tempIndex = headers.indexOf('Temperature');
const rainIndex = headers.indexOf('Rainfall');

const crops = new Set();
const soils = new Set();

for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length > rainIndex) {
        crops.add(cols[cropIndex].trim());
        soils.add(cols[soilIndex].trim());
    }
}

console.log('Crops:', Array.from(crops));
console.log('Soils:', Array.from(soils));
