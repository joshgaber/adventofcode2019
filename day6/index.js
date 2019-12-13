const fs = require('fs');
const path = require('path');

const getChildrenDepth = o => o.children.reduce((a, b) => a + getChildrenDepth(b), o.children.length);

function findPath(target, orbit, explored = []) {
    explored.push(orbit.name);

    if (orbit.name === target.name) {
        return orbit.name;
    }

    let findNext = orbit.neighbors.reduce((path, o) =>
        path + (!explored.includes(o.name) ? findPath(target, o, explored) : '')
        , '');
    return (findNext !== '' ? findNext + ':' + orbit.name : '');
}

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const orbits = data.split(/\r?\n/g);
const orbitMap = [];

orbits.forEach(function(orbit) {
    const [orbitee, orbiter] = orbit.split(')');
    if (! ($orbiter = orbitMap.find(em => orbiter === em.name))) {
        $orbiter = { name: orbiter, neighbors: [], children: [], parent: null };
        orbitMap.push($orbiter);
    }
    if (! ($orbitee = orbitMap.find(em => orbitee === em.name))) {
        $orbitee = { name: orbitee, neighbors: [], children: [], parent: null };
        orbitMap.push($orbitee);
    }
    $orbitee.neighbors.push($orbiter);
    $orbitee.children.push($orbiter);
    $orbiter.neighbors.push($orbitee);
    $orbiter.parent = $orbitee;
});

const totalOrbits = orbitMap.reduce((a, b) => a + getChildrenDepth(b), 0);
console.log(`Total direct and indirect orbits:`, totalOrbits);

const orbitPath = findPath(orbitMap.find(o => o.name === 'SAN').parent, orbitMap.find(o => o.name === 'YOU').parent);
const distance = orbitPath.match(/:/g).length;

console.log(`Number of hops from YOU parent to SAN parent:`, distance);
