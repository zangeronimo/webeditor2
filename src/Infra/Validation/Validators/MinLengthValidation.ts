import { MinLengthError } from '../Errors/MinLengthError'
import { IFieldValidation } from '../Interfaces/IFieldValidation'

export class MinLengthValidation implements IFieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error {
    return input[this.field]?.length < this.minLength
      ? new MinLengthError(this.minLength)
      : null
  }
}
