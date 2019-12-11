const fs = require('fs');
let explored = [];

fs.readFile('./input.txt', 'utf8', function(err, data) {
    const orbits = data.split(/\r?\n/g);
    let orbitMap = [];

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
        $orbiter.parent = orbitee;
    });

    const totalOrbits = orbitMap.reduce((a, b) => a + getChildrenDepth(b), 0);
    console.log(`Total direct and indirect orbits:`, totalOrbits);

    let path = searchFor('SAN', orbitMap.find(o => o.name === 'YOU'), 0);
    let pathArray = path.split(':');
    let distance = pathArray.length;

    (pathArray.includes(orbitMap.find(o => o.name === 'YOU').parent.name)) ? distance-- : distance++;
    (pathArray.includes(orbitMap.find(o => o.name === 'SAN').parent.name)) ? distance-- : distance++;
    console.log(`distance:`, distance);
});

function searchFor(target, orbit) {
    explored.push(orbit.name);

    if (orbit.name === target) {
        return orbit.name;
    }

    let findNext = orbit.neighbors.reduce((path, o) =>
        path + (!explored.includes(o.name) ? searchFor(target, o) : '')
    , '');
    return (findNext !== '' ? findNext + ':' + orbit.name : '');
}

function getChildrenDepth(o) {
    return o.children.reduce((a, b) => a + getChildrenDepth(b), o.children.length);
}