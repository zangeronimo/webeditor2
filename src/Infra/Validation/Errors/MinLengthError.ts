export class MinLengthError extends Error {
  constructor(minLength: number) {
    super(`Minimum ${minLength} characters`)
  }
}
