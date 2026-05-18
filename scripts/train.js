const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');
const Jimp = require('jimp');

const DATASET_DIR = "c:\\Users\\SAAD'S DEVICE\\Desktop\\rice_leaf_diseases";
const OUTPUT_FILE = path.join(__dirname, '../lib/ml/disease_model.json');

async function imageToTensor(imagePath) {
    const image = await Jimp.read(imagePath);
    image.resize(224, 224); // MobileNet default size
    
    const p = [];
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        p.push(this.bitmap.data[idx + 0]); // R
        p.push(this.bitmap.data[idx + 1]); // G
        p.push(this.bitmap.data[idx + 2]); // B
    });
    
    return tf.tensor3d(p, [224, 224, 3], 'int32');
}

async function train() {
    console.log("Loading MobileNet and KNN...");
    const net = await mobilenet.load({ version: 2, alpha: 1.0 });
    const classifier = knnClassifier.create();

    const classes = ['Bacterial leaf blight', 'Brown spot', 'Leaf smut'];
    
    for (let i = 0; i < classes.length; i++) {
        const className = classes[i];
        const classDir = path.join(DATASET_DIR, className);
        if (!fs.existsSync(classDir)) {
            console.log(`Directory not found: ${classDir}`);
            continue;
        }

        const files = fs.readdirSync(classDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));
        console.log(`Training ${className} (${files.length} images)...`);

        for (let j = 0; j < files.length; j++) {
            const imgPath = path.join(classDir, files[j]);
            try {
                const tensor = await imageToTensor(imgPath);
                const activation = net.infer(tensor, true);
                classifier.addExample(activation, i);
                
                // Cleanup memory
                tensor.dispose();
                if (j % 10 === 0) console.log(`  Processed ${j}/${files.length} images for ${className}`);
            } catch (e) {
                console.error(`Error processing ${imgPath}:`, e);
            }
        }
    }

    console.log("Saving model...");
    const dataset = classifier.getClassifierDataset();
    const datasetObj = {};
    Object.keys(dataset).forEach((key) => {
        const data = dataset[key].dataSync();
        // Shape is usually [num_examples, num_features]
        datasetObj[key] = {
            data: Array.from(data),
            shape: dataset[key].shape
        };
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(datasetObj));
    console.log(`Model successfully saved to ${OUTPUT_FILE}`);
}

train().catch(console.error);
