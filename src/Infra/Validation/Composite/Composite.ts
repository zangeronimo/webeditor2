import { IFieldValidation } from '../Interfaces/IFieldValidation'
import { IValidation } from '../Interfaces/IValidation'

export class Composite implements IValidation {
  private constructor(private readonly validators: IFieldValidation[]) {}

  static build(validators: IFieldValidation[]): Composite {
    return new Composite(validators)
  }

  validate(fieldName: string, input: object): string {
    const validators = this.validators.filter(v => v.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(input)
      if (error) {
        return error.message
      }
    }
  }
}
