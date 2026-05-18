import { NextResponse } from 'next/server';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';

// Load model state
let classifier: knnClassifier.KNNClassifier | null = null;
let net: mobilenet.MobileNet | null = null;
const CLASSES = ['Bacterial leaf blight', 'Brown spot', 'Leaf smut'];

async function loadModels() {
    if (!net) {
        net = await mobilenet.load({ version: 2, alpha: 1.0 });
    }
    if (!classifier) {
        classifier = knnClassifier.create();
        
        // Ensure path resolves correctly in Vercel/Next.js
        const modelPath = path.join(process.cwd(), 'lib/ml/disease_model.json');
        
        if (fs.existsSync(modelPath)) {
            const rawData = fs.readFileSync(modelPath, 'utf8');
            const datasetObj = JSON.parse(rawData);
            
            const dataset: { [label: string]: tf.Tensor2D } = {};
            Object.keys(datasetObj).forEach((key) => {
                const { data, shape } = datasetObj[key];
                dataset[key] = tf.tensor2d(data, shape);
            });
            classifier.setClassifierDataset(dataset);
        } else {
            console.error('Disease model JSON not found!');
        }
    }
}

async function bufferToTensor(buffer: Buffer) {
    const image = await Jimp.read(buffer);
    image.resize(224, 224); // MobileNet size
    
    const p: number[] = [];
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        p.push(this.bitmap.data[idx + 0]); // R
        p.push(this.bitmap.data[idx + 1]); // G
        p.push(this.bitmap.data[idx + 2]); // B
    });
    
    return tf.tensor3d(p, [224, 224, 3], 'int32');
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        
        if (!file) {
            return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        await loadModels();

        if (!net || !classifier) {
            return NextResponse.json({ error: 'Models not loaded' }, { status: 500 });
        }

        const tensor = await bufferToTensor(buffer);
        const activation = net.infer(tensor, true);
        const result = await classifier.predictClass(activation);
        
        tensor.dispose();
        activation.dispose();

        const diseaseName = CLASSES[parseInt(result.label)];
        const rawConf = result.confidences[result.label] || 0;
        const confidence = (rawConf * 100).toFixed(2);

        return NextResponse.json({
            disease: diseaseName,
            confidence: confidence
        });

    } catch (error) {
        console.error('Disease prediction error:', error);
        return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 });
    }
}
