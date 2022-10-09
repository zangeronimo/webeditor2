import { Builder } from '@/Infra/Validation/Builder/Builder'
import { Composite } from '@/Infra/Validation/Composite/Composite'

export const TagValidationData = (): Composite => {
  return Composite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('recipeCategoryGuid').required().build(),
  ])
}
