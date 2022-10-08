import { Builder } from '@/Infra/Validation/Builder/Builder'
import { Composite } from '@/Infra/Validation/Composite/Composite'

export const AuthValidation = (): Composite => {
  return Composite.build([
    ...Builder.field('username').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
  ])
}
