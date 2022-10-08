export class InvalidSameAsError extends Error {
  constructor(compareName: string) {
    super(`Field different from ${compareName}`)
  }
}
