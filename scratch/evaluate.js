const fs = require('fs');
const KNN = require('ml-knn');

const dataRaw = fs.readFileSync('lib/ml/optimized_dataset.json', 'utf8');
const dataset = JSON.parse(dataRaw);

const features = dataset.features;
const labels = dataset.labels;

// Shuffle data
const indices = Array.from({length: features.length}, (_, i) => i);
for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
}

const splitIdx = Math.floor(features.length * 0.8);
const trainFeatures = [];
const trainLabels = [];
const testFeatures = [];
const testLabels = [];

for (let i = 0; i < features.length; i++) {
    const idx = indices[i];
    
    const rawF = features[idx];
    const normF = [
        rawF[0] / 4.0,   // soil (1-4)
        rawF[1] / 25.0,  // rain (0-25)
        rawF[2] / 50.0,  // temp (0-50)
        rawF[3] / 3.0    // season (1-3)
    ];

    if (i < splitIdx) {
        trainFeatures.push(normF);
        trainLabels.push(labels[idx]);
    } else {
        testFeatures.push(normF);
        testLabels.push(labels[idx]);
    }
}

console.log(`Training on ${trainFeatures.length} samples, testing on ${testFeatures.length} samples...`);

const knn = new KNN(trainFeatures, trainLabels, { k: 3 });

let correct = 0;
for (let i = 0; i < testFeatures.length; i++) {
    const prediction = knn.predict(testFeatures[i]);
    if (prediction === testLabels[i]) {
        correct++;
    }
}

const accuracy = (correct / testFeatures.length) * 100;
console.log(`Crop Recommendation Model Accuracy: ${accuracy.toFixed(2)}%`);
