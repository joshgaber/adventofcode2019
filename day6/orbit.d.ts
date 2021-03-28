export default interface Orbit {
    name: string
    neighbors: Orbit[]
    children: Orbit[]
    parent: Orbit
}