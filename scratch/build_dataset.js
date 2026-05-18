const fs = require('fs');
const path = require('path');

const csv = fs.readFileSync(path.join(__dirname, '../Soil-Climate-data.csv'), 'utf8');
const lines = csv.split('\n').filter(l => l.trim().length > 0);
const headers = lines[0].split(',');

const cropIndex = headers.indexOf('Crop_Type');
const soilIndex = headers.indexOf('Soil_Type');
const tempIndex = headers.indexOf('Temperature');
const rainIndex = headers.indexOf('Rainfall');

// Encoding maps
const soilMap = {
    'alluvial soils': 1,
    'red and yellow soils': 2,
    'black soils': 3,
    'laterite soils': 4
};

const seasonMap = {
    'kharif': 1,
    'rabi': 2,
    'summer': 3
};

// Mock season assignments based on common Indian agriculture seasons
const cropSeasons = {
    'summer paddy': 'summer',
    'kulthi': 'kharif',
    'arhar': 'kharif',
    'gram': 'rabi',
    'pea': 'rabi',
    'soybean': 'kharif',
    'maize': 'kharif',
    'rice': 'kharif',
    'mustard': 'rabi',
    'urd': 'kharif',
    'wheat': 'rabi',
    'masoor': 'rabi',
    'millets': 'kharif',
    'groundnut': 'kharif',
    'niger': 'kharif',
    'tiwra': 'rabi',
    'til': 'kharif',
    'moong': 'summer',
    'jwar': 'kharif'
};

const crops = new Set();
// Get unique crops
for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length > rainIndex) crops.add(cols[cropIndex].trim());
}

const cropList = Array.from(crops);
const cropToId = {};
cropList.forEach((c, i) => cropToId[c] = i);

const features = [];
const labels = [];

for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length <= rainIndex) continue;

    const cropName = cols[cropIndex].trim();
    const soilName = cols[soilIndex].trim().toLowerCase();
    const temp = parseFloat(cols[tempIndex]);
    const rain = parseFloat(cols[rainIndex]) / 100.0; // scale down
    
    const cropSeasonStr = cropSeasons[cropName.toLowerCase()] || 'kharif';
    
    const soilEncoded = soilMap[soilName] || 2;
    const seasonEncoded = seasonMap[cropSeasonStr] || 1;
    const labelEncoded = cropToId[cropName];

    features.push([soilEncoded, rain, temp, seasonEncoded]);
    labels.push(labelEncoded);
}

const output = {
    features,
    labels,
    cropMap: cropList, // id to crop name
    soilMap,
    seasonMap
};

fs.writeFileSync(path.join(__dirname, '../lib/ml/optimized_dataset.json'), JSON.stringify(output, null, 0));
console.log(`Successfully parsed ${features.length} rows and created optimized dataset!`);
