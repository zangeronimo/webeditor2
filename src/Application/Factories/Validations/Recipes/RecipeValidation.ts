import { Builder } from '@/Infra/Validation/Builder/Builder'
import { Composite } from '@/Infra/Validation/Composite/Composite'

export const RecipeValidationData = (): Composite => {
  return Composite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('recipeCategoryGuid').required().build(),
    ...Builder.field('ingredients').required().build(),
    ...Builder.field('preparation').required().build(),
  ])
}
