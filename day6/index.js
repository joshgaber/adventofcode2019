const fs = require('fs');
var explored = [];
var max_length = 500;

fs.readFile('./input.txt', 'utf8', function(err, data) {
    const orbits = data.split(/\r?\n/g);
    let orbitMap = [];

    orbits.forEach(function(orbit) {
        const [orbitee, orbiter] = orbit.split(')');
        if (! ($orbiter = orbitMap.find(em => orbiter === em.name))) {
            $orbiter = { name: orbiter, neighbors: [], parent: null }
            orbitMap.push($orbiter);
        }
        if (! ($orbitee = orbitMap.find(em => orbitee === em.name))) {
            $orbitee = { name: orbitee, neighbors: [], parent: null }
            orbitMap.push($orbitee);
        }
        $orbitee.neighbors.push($orbiter);
        $orbiter.neighbors.push($orbitee);
        $orbiter.parent = orbitee;
    })

    let distance = searchFor('SAN', orbitMap.find(o => o.name === 'YOU'), 0);
    

    if (!explored.includes(orbitMap.find(o => o.name === 'YOU').parent.name)) distance++;
    if (!explored.includes(orbitMap.find(o => o.name === 'SAN').parent.name)) distance++;
    console.log(distance);
})

function searchFor(target, orbit, depth) {
    explored.push(orbit.name);
    if (depth >= 353) {
        return 0;
    }
    if (orbit.name === target) {
        return depth;
    }

    return orbit.neighbors.reduce(function(count, o) {
        if (!explored.includes(o.name)) {
            return count + searchFor(target, o, depth+1);
        }
        return count + 0;
    }, 0)
}