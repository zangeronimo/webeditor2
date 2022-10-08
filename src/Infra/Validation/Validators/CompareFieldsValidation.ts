import { InvalidSameAsError } from '../Errors/InvalidSameAsError'
import { IFieldValidation } from '../Interfaces/IFieldValidation'

export class CompareFieldsValidation implements IFieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string,
  ) {}

  validate(input: object): Error {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidSameAsError('New Password')
      : null
  }
}
