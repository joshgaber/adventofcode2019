const fs = require('fs');

fs.readFile('./input.txt', 'utf8', function(err, data) {
    const orbits = data.split(/\r?\n/g);
    let orbitMap = [];

    orbits.forEach(function(orbit) {
        const [orbitee, orbiter] = orbit.split(')');
        if (! ($orbiter = orbitMap.find(em => orbiter === em.name))) {
            $orbiter = { name: orbiter, children: [] }
            orbitMap.push($orbiter);
        }
        if (! ($orbitee = orbitMap.find(em => orbitee === em.name))) {
            $orbitee = { name: orbitee, children: [] }
            orbitMap.push($orbitee);
        }
        $orbitee.children.push($orbiter);
    })

    const orbitTotal = orbitMap.reduce((x, o) => x + getAllOrbits(o), 0);
    console.log(orbitTotal);
})

function getAllOrbits(orbit) {
    return orbit.children.reduce((i, j) => i + getAllOrbits(j), orbit.children.flat(Infinity).length)
}