export default interface Formula {
    yield: number
    reactants: { quantity: number; name: string }[]
    reserve: number
}