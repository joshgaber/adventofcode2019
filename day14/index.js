const fs = require('fs');
const path = require('path');

function buildFormulae(data) {
  let formulae = {};
  const lines = data.split(/\r?\n/g);
  lines.forEach(l => {
    const [reactants, product] = l.split(' => ');
    const [quantity, name] = product.split(' ');
    formulae[name] = {
      name: name,
      yield: parseInt(quantity),
      required: 0,
      reactants: buildReactants(reactants)
    };
  });

  return formulae;
}

function buildReactants(reactants) {
  const list = reactants.split(/, */g);
  return list.map(l => {
    const [quantity, name] = l.split(' ');
    return {
      name: name,
      quantity: parseInt(quantity)
    };
  });
}

function findOreRequired (product, required, formulae) {
  // const reactions = Math.ceil(required / product.yield);
  // const formula = product.reactants.reduce((a, b) => (
  //   b.name === 'ORE' ? a + b.quantity : a + findOreRequired(formulae[b.name], b.quantity, formulae)
  // ), 0);
  const formula = product.reactants.forEach(r => {
    formulae[r.name].required += r.quantity;
    if (r.name !== 'ORE') {
      findOreRequired(formulae[r.name], r.quantity, formulae)
    }
  }, 0);
}



data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const formulae = buildFormulae(data);
formulae.ORE = { name: 'ORE', required: 0 }

findOreRequired(formulae.FUEL, 1, formulae)

console.log(Object.keys(formulae).map(a => ({name: formulae[a].name, yield: formulae[a].yield, required: formulae[a].required})));