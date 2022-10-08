import { IFieldValidation } from '../Interfaces/IFieldValidation'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation,
} from '../Validators'

export class Builder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: IFieldValidation[],
  ) {}

  static field(fieldName: string): Builder {
    return new Builder(fieldName, [])
  }

  required(): Builder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email(): Builder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min(length: number): Builder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  sameAs(fieldToCompare: string): Builder {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare),
    )
    return this
  }

  build(): IFieldValidation[] {
    return this.validations
  }
}
