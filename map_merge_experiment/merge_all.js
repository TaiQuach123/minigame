
import fs from 'fs';
import * as topojson from 'topojson-client';
import { union } from '@turf/turf';

// Load the TopoJSON file
const rawData = fs.readFileSync('./vn-all.topo.json');
const topology = JSON.parse(rawData);

// Convert to GeoJSON
let geojson = topojson.feature(topology, topology.objects.default);

console.log(`Original feature count: ${geojson.features.length}`);

// Define the merges
// Format: { name: "New Name", keys: ["key1", "key2", ...], newKey: "unique-new-key" }
// Note: keys must match exact hc-key in the map data.

const merges = [
    { name: "Lào Cai", keys: ["vn-lo", "vn-yb"], newKey: "vn-laocai-merged" },
    { name: "Thái Nguyên", keys: ["vn-ty", "vn-307"], newKey: "vn-thainguyen-merged" }, // Bac Kan: vn-307
    { name: "Phú Thọ", keys: ["vn-pt", "vn-vc", "vn-ho"], newKey: "vn-phutho-merged" },
    { name: "Bắc Ninh", keys: ["vn-bn", "vn-bg"], newKey: "vn-bacninh-merged" },
    { name: "Hưng Yên", keys: ["vn-317", "vn-tb"], newKey: "vn-hungyen-merged" }, // Hung Yen: vn-317
    { name: "TP. Hải Phòng", keys: ["vn-3623", "vn-hd"], newKey: "vn-haiphong-merged" }, // Haiphong: vn-3623
    { name: "Ninh Bình", keys: ["vn-nb", "vn-hm", "vn-nd"], newKey: "vn-ninhbinh-merged" },
    { name: "Quảng Trị", keys: ["vn-qt", "vn-qb"], newKey: "vn-quangtri-merged" },
    { name: "TP. Đà Nẵng", keys: ["vn-da", "vn-300"], newKey: "vn-danang-merged" }, // Quang Nam: vn-300
    { name: "Quảng Ngãi", keys: ["vn-qg", "vn-299"], newKey: "vn-quangngai-merged" }, // Kon Tum: vn-299
    { name: "Gia Lai", keys: ["vn-724", "vn-bd"], newKey: "vn-gialai-merged" }, // Gia Lai: vn-724
    { name: "Khánh Hòa", keys: ["vn-kh", "vn-nt"], newKey: "vn-khanhhoa-merged" },
    { name: "Lâm Đồng", keys: ["vn-ld", "vn-6365", "vn-bu"], newKey: "vn-lamdong-merged" }, // Dak Nong: vn-6365, Binh Thuan: vn-bu
    { name: "Đắk Lắk", keys: ["vn-723", "vn-py"], newKey: "vn-daklak-merged" }, // Dak Lak: vn-723
    { name: "TP. Hồ Chí Minh", keys: ["vn-hc", "vn-bv", "vn-bi"], newKey: "vn-hcm-merged" },
    { name: "Đồng Nai", keys: ["vn-331", "vn-bp"], newKey: "vn-dongnai-merged" }, // Southeast (Dong Nai): vn-331
    { name: "Tây Ninh", keys: ["vn-tn", "vn-la"], newKey: "vn-tayninh-merged" },
    { name: "TP. Cần Thơ", keys: ["vn-333", "vn-st", "vn-337"], newKey: "vn-cantho-merged" }, // Can Tho: vn-333, Hau Giang: vn-337
    { name: "Vĩnh Long", keys: ["vn-vl", "vn-br", "vn-tv"], newKey: "vn-vinhlong-merged" },
    { name: "Đồng Tháp", keys: ["vn-dt", "vn-tg"], newKey: "vn-dongthap-merged" },
    { name: "Cà Mau", keys: ["vn-cm", "vn-bl"], newKey: "vn-camau-merged" },
    { name: "An Giang", keys: ["vn-ag", "vn-kg"], newKey: "vn-angiang-merged" },
    { name: "Tuyên Quang", keys: ["vn-tq", "vn-hg"], newKey: "vn-tuyenquang-merged" }
];

let currentFeatures = [...geojson.features];
const featuresToRemove = new Set();
const newFeaturesList = [];

for (const merge of merges) {
    console.log(`Merging ${merge.name}...`);
    
    // Find the features
    const featuresToMerge = currentFeatures.filter(f => merge.keys.includes(f.properties['hc-key']));
    
    if (featuresToMerge.length !== merge.keys.length) {
        console.warn(`WARNING: Expected ${merge.keys.length} features for ${merge.name}, found ${featuresToMerge.length}. Keys: ${merge.keys.join(', ')}`);
        const foundKeys = featuresToMerge.map(f => f.properties['hc-key']);
        const missingKeys = merge.keys.filter(k => !foundKeys.includes(k));
        console.warn(`Missing: ${missingKeys.join(', ')}`);
        // We'll try to merge what we found if > 1, otherwise skip
        if (featuresToMerge.length < 2) {
             console.error(`Skipping ${merge.name} due to insufficient features.`);
             continue;
        }
    }

    try {
        const merged = union({ type: 'FeatureCollection', features: featuresToMerge });
        
        if (merged) {
            // Update properties
            const baseProps = featuresToMerge[0].properties; // Take props from first one as base
            merged.properties = {
                ...baseProps,
                'hc-key': merge.newKey,
                'name': merge.name,
                'hc-group': 'admin1', // Ensure good grouping
                // Clear old specific props if needed
                'woe-id': undefined,
                'hc-a2': undefined
            };

            newFeaturesList.push(merged);
            
            // Mark source features for removal
            featuresToMerge.forEach(f => featuresToRemove.add(f));
        } else {
             console.error(`Result of union for ${merge.name} was null.`);
        }
    } catch (e) {
        console.error(`Error merging ${merge.name}:`, e);
    }
}

// Remove the old features from the main list
const finalFeatures = currentFeatures.filter(f => !featuresToRemove.has(f));

// Add the new merged features
finalFeatures.push(...newFeaturesList);

geojson.features = finalFeatures;

console.log(`New feature count: ${geojson.features.length}`);

// Save detailed GeoJSON
fs.writeFileSync('./vn-all-merged.json', JSON.stringify(geojson, null, 2));

// Save as JS for easy consumption
const jsContent = `window.mergedMapData = ${JSON.stringify(geojson)};`;
fs.writeFileSync('./vn-all-merged-data.js', jsContent);

console.log('Done! Saved vn-all-merged.json and vn-all-merged-data.js');
