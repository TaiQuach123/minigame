
import fs from 'fs';
import * as topojson from 'topojson-client';

const rawData = fs.readFileSync('./vn-all.topo.json');
const topology = JSON.parse(rawData);
const geojson = topojson.feature(topology, topology.objects.default);

const map = {};
geojson.features.forEach(f => {
    map[f.properties.name] = f.properties['hc-key'];
});

console.log(JSON.stringify(map, null, 2));
