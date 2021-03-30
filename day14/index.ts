import Formula from './formula'

export default class Day14 {
  private formulae: { [p: string]: Formula }
  private ore: number
  constructor(data: string) {
    this.formulae = this.buildFormulae(data)
    this.ore = this.findOreRequired(this.formulae.FUEL, 1)
  }

  part1(): void {
    console.log('Ore required to produce 1 Fuel:', this.ore)
  }

  part2(): void {
    let ore = this.ore
    const maxOre = 1000000000000
    let maxFuelProduced = 1
    do {
      this.clearReserve()
      const newFuel = Math.floor((maxFuelProduced / ore) * maxOre)
      if (newFuel === maxFuelProduced) break

      ore = this.findOreRequired(this.formulae.FUEL, newFuel)
      if (ore > maxOre) break
      maxFuelProduced = newFuel
    } while (true)

    console.log('Fuel produced from 1 trillion ore:', maxFuelProduced)
  }

  buildFormulae = (data: string): { [key: string]: Formula } =>
    data.split(/\r?\n/g).reduce(
      (a, l) => ({
        ...a,
        [l.split(' => ')[1].split(' ')[1]]: {
          yield: parseInt(l.split(' => ')[1].split(' ')[0]),
          reserve: 0,
          reactants: this.buildReactants(l.split(' => ')[0])
        }
      }),
      {}
    )

  buildReactants = (reactants: string): { name: string; quantity: number }[] =>
    reactants.split(/, */g).map((l) => ({
      name: l.split(' ')[1],
      quantity: parseInt(l.split(' ')[0])
    }))

  clearReserve = (): void =>
    Object.keys(this.formulae).forEach((f) => (this.formulae[f].reserve = 0))

  findOreRequired(product: Formula, required: number): number {
    const reactions = Math.ceil((required - product.reserve) / product.yield)
    product.reserve = reactions * product.yield + product.reserve - required

    return product.reactants.reduce(
      (a, r) =>
        a +
        (r.name === 'ORE'
          ? reactions * r.quantity
          : this.findOreRequired(
              this.formulae[r.name],
              reactions * r.quantity
            )),
      0
    )
  }
}
