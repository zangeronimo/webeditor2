import { RequiredFieldError } from '../Errors/RequiredFieldError'
import { IFieldValidation } from '../Interfaces/IFieldValidation'

export class RequiredFieldValidation implements IFieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
