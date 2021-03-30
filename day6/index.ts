import Orbit from './orbit'

export default class Day6 {
  private orbitMap: Orbit[]
  constructor(data: string) {
    const orbits = data.split(/\r?\n/g)
    this.orbitMap = []

    orbits.forEach(
      function (orbit: string) {
        const [orbitee, orbiter] = orbit.split(')')
        let $orbiter: Orbit
        if (
          !($orbiter = this.orbitMap.find((em: Orbit) => orbiter === em.name))
        ) {
          $orbiter = {
            name: orbiter,
            neighbors: [],
            children: [],
            parent: null
          }
          this.orbitMap.push($orbiter)
        }
        let $orbitee: Orbit
        if (
          !($orbitee = this.orbitMap.find((em: Orbit) => orbitee === em.name))
        ) {
          $orbitee = {
            name: orbitee,
            neighbors: [],
            children: [],
            parent: null
          }
          this.orbitMap.push($orbitee)
        }
        $orbitee.neighbors.push($orbiter)
        $orbitee.children.push($orbiter)
        $orbiter.neighbors.push($orbitee)
        $orbiter.parent = $orbitee
      }.bind(this)
    )
  }

  part1(): void {
    const totalOrbits = this.orbitMap.reduce(
      (a, b) => a + this.getChildrenDepth(b),
      0
    )
    console.log(`Total direct and indirect orbits:`, totalOrbits)
  }

  part2(): void {
    const orbitPath = this.findPath(
      this.orbitMap.find((o) => o.name === 'SAN').parent,
      this.orbitMap.find((o) => o.name === 'YOU').parent
    )
    const distance = orbitPath.match(/:/g).length

    console.log(`Number of hops from YOU parent to SAN parent:`, distance)
  }

  getChildrenDepth = (o: Orbit): number =>
    o.children.reduce((a, b) => a + this.getChildrenDepth(b), o.children.length)

  findPath(target: Orbit, orbit: Orbit, explored: string[] = []): string {
    explored.push(orbit.name)

    if (orbit.name === target.name) {
      return orbit.name
    }

    const findNext = orbit.neighbors.reduce(
      (path, o) =>
        path +
        (!explored.includes(o.name) ? this.findPath(target, o, explored) : ''),
      ''
    )
    return findNext !== '' ? findNext + ':' + orbit.name : ''
  }
}
