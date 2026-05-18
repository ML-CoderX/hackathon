const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');
const Jimp = require('jimp');

const DATASETS = [
    {
        dir: "c:\\Users\\SAAD'S DEVICE\\Desktop\\rice_leaf_diseases",
        classes: ['Bacterial leaf blight', 'Brown spot', 'Leaf smut']
    },
    {
        dir: "c:\\Users\\SAAD'S DEVICE\\Desktop\\data",
        classes: ['Blight', 'Common_Rust', 'Gray_Leaf_Spot', 'Healthy']
    }
];
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

    const allClasses = DATASETS.flatMap(d => d.classes);
    
    let classIndexCounter = 0;

    for (const dataset of DATASETS) {
        for (const className of dataset.classes) {
            const classDir = path.join(dataset.dir, className);
            if (!fs.existsSync(classDir)) {
                console.log(`Directory not found: ${classDir}`);
                classIndexCounter++;
                continue;
            }

            const files = fs.readdirSync(classDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));
            
            // Limit to 50 images per class for faster hackathon training
            const maxImages = Math.min(files.length, 50);
            console.log(`Training ${className} (${maxImages} images)...`);

            for (let j = 0; j < maxImages; j++) {
                const imgPath = path.join(classDir, files[j]);
                try {
                    const tensor = await imageToTensor(imgPath);
                    const activation = net.infer(tensor, true);
                    classifier.addExample(activation, classIndexCounter);
                    
                    tensor.dispose();
                    if (j % 10 === 0) console.log(`  Processed ${j}/${files.length} images for ${className}`);
                } catch (e) {
                    console.error(`Error processing ${imgPath}:`, e);
                }
            }
            classIndexCounter++;
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
