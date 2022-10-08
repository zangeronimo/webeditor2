import { Builder } from '@/Infra/Validation/Builder/Builder'
import { Composite } from '@/Infra/Validation/Composite/Composite'

export const ProfileValidationData = (): Composite => {
  return Composite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
  ])
}

export const ProfileValidationPassword = (): Composite => {
  return Composite.build([
    ...Builder.field('current').required().min(5).build(),
    ...Builder.field('newPassword').required().min(5).build(),
    ...Builder.field('confirmation').required().sameAs('newPassword').build(),
  ])
}
