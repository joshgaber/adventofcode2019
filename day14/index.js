export default class Day14 {
  constructor(data) {
    this.formulae = this.buildFormulae(data);
    this.ore = this.findOreRequired(this.formulae.FUEL, 1, this.formulae);
  }

  part1() {
    console.log('Ore required to produce 1 Fuel:', this.ore);
  }

  part2() {
    let ore = this.ore
    const maxOre = 1000000000000
    let maxFuelProduced = 1;
    do {
      this.clearReserve(this.formulae);
      const newFuel = Math.floor(maxFuelProduced / ore * maxOre);
      if (newFuel === maxFuelProduced) break;

      ore = this.findOreRequired(this.formulae.FUEL, newFuel, this.formulae);
      if (ore > maxOre) break;
      maxFuelProduced = newFuel;
    } while (true);

    console.log('Fuel produced from 1 trillion ore:', maxFuelProduced);
  }

  buildFormulae = (data) => data.split(/\r?\n/g).reduce((a, l) => ({
    ...a,
    [l.split(' => ')[1].split(' ')[1]]: {
      yield: parseInt(l.split(' => ')[1].split(' ')[0]),
      reserve: 0,
      reactants: this.buildReactants(l.split(' => ')[0])
    }
  }), {});

  buildReactants = (reactants) => reactants.split(/, */g).map(l =>
      ({
        name: l.split(' ')[1],
        quantity: parseInt(l.split(' ')[0])
      })
  );

  clearReserve = (formulae) => Object.keys(formulae).forEach(f => formulae[f].reserve = 0);



  findOreRequired (product, required, formulae) {
    const reactions = Math.ceil((required - product.reserve) / product.yield);
    product.reserve = reactions * product.yield + product.reserve - required;

    return product.reactants.reduce((a, r) =>
        a + (
            r.name === 'ORE' ?
                reactions * r.quantity :
                this.findOreRequired(formulae[r.name], reactions * r.quantity, formulae)
        )
        , 0);
  }
}
