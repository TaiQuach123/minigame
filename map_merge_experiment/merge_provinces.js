
import fs from 'fs';
import * as topojson from 'topojson-client';
import { union } from '@turf/turf';

// Load the TopoJSON file
const rawData = fs.readFileSync('./vn-all.topo.json');
const topology = JSON.parse(rawData);

// Convert to GeoJSON
const geojson = topojson.feature(topology, topology.objects.default);

console.log(`Original feature count: ${geojson.features.length}`);

// Find the features to merge (An Giang and Kien Giang)
const code1 = 'vn-ag';
const code2 = 'vn-kg';

const feature1 = geojson.features.find(f => f.properties['hc-key'] === code1);
const feature2 = geojson.features.find(f => f.properties['hc-key'] === code2);

if (!feature1 || !feature2) {
    console.error(`Features not found: ${code1}: ${!!feature1}, ${code2}: ${!!feature2}`);
    process.exit(1);
}

console.log('Feature 1 type:', feature1.geometry.type);
console.log('Feature 2 type:', feature2.geometry.type);
// Merge them using Turf.js
// turf.union takes two features
const merged = union({ type: 'FeatureCollection', features: [feature1, feature2] });

if (!merged) {
    console.error('Merge failed');
    process.exit(1);
}

// Update properties for the merged feature
// We'll create a new key 'vn-ag-kg'
merged.properties = {
    ...feature1.properties, // Keep properties from one (or merge manually)
    'hc-key': 'vn-ag-kg',
    'name': 'An Giang + Kien Giang',
    'labelrank': feature1.properties.labelrank, // preserve or adjust
    'hc-a2': 'MK' // Example "Merged Key" 
};

// Remove the old features and add the new one
const newFeatures = geojson.features.filter(f => 
    f.properties['hc-key'] !== code1 && 
    f.properties['hc-key'] !== code2
);

newFeatures.push(merged);

const newGeoJSON = {
    ...geojson,
    features: newFeatures
};

console.log(`New feature count: ${newFeatures.length}`);

// Save detailed GeoJSON
fs.writeFileSync('./vn-merged.json', JSON.stringify(newGeoJSON, null, 2));

// Also save as a JS file for easy loading in a simple HTML demo without CORS
const jsContent = `window.mergedMapData = ${JSON.stringify(newGeoJSON)};`;
fs.writeFileSync('./vn-merged-data.js', jsContent);

console.log('Done! Saved vn-merged.json and vn-merged-data.js');
