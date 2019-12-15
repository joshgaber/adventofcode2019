const fs = require('fs');
const path = require('path');

const buildFormulae = (data) => data.split(/\r?\n/g).reduce((a, l) => ({
  ...a,
  [l.split(' => ')[1].split(' ')[1]]: {
    yield: parseInt(l.split(' => ')[1].split(' ')[0]),
    reserve: 0,
    reactants: buildReactants(l.split(' => ')[0])
  }
}), {});

const buildReactants = (reactants) => reactants.split(/, */g).map(l => 
  ({
    name: l.split(' ')[1],
    quantity: parseInt(l.split(' ')[0])
  })
);

const clearReserve = (formulae) => Object.keys(formulae).forEach(f => formulae[f].reserve = 0);



function findOreRequired (product, required, formulae) {
  const reactions = Math.ceil((required - product.reserve) / product.yield);
  product.reserve = reactions * product.yield + product.reserve - required;
  
  return product.reactants.reduce((a, r) => 
    a + (
      r.name === 'ORE' ?
      reactions * r.quantity :
      findOreRequired(formulae[r.name], reactions * r.quantity, formulae)
    )
  , 0);
}

data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const formulae = buildFormulae(data);

let ore = findOreRequired(formulae.FUEL, 1, formulae);
console.log('Ore required to produce 1 Fuel:', ore);

const maxOre = 1000000000000
let maxFuelProduced = 1;
do {
  clearReserve(formulae);
  const newFuel = Math.floor(maxFuelProduced / ore * maxOre);
  if (newFuel === maxFuelProduced) break;

  ore = findOreRequired(formulae.FUEL, newFuel, formulae);
  if (ore > maxOre) break;
  maxFuelProduced = newFuel;
} while (true);

console.log('Fuel produced from 1 trillion ore:', maxFuelProduced);
