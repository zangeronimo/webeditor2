export class MaxLengthError extends Error {
  constructor(maxLength: number) {
    super(`Maximum ${maxLength} characters`)
  }
}
