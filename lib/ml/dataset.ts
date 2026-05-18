import optimizedData from './optimized_dataset.json';

export const trainingData = optimizedData.features;
export const trainingLabels = optimizedData.labels;

export const encodeSoil = (soil: string): number => {
  const map = optimizedData.soilMap as Record<string, number>;
  return map[soil.toLowerCase()] || 2; // default
};

export const encodeSeason = (season: string): number => {
  const map = optimizedData.seasonMap as Record<string, number>;
  return map[season.toLowerCase()] || 1; // default
};

export const decodeCrop = (label: number): string => {
  const crops = optimizedData.cropMap as string[];
  return crops[label] || 'Unknown';
};

export const getCropDetails = (cropName: string) => {
  // Mock UI details since the CSV doesn't have yield/practices
  return {
    name: cropName,
    season: 'Based on your selection',
    yield: 'Varies based on Farm Size',
    bestPractices: [
      'Maintain adequate irrigation',
      'Use high-quality certified seeds',
      'Regular pest monitoring'
    ],
    marketPrice: 'Check local Mandi for real-time rates',
  };
};
