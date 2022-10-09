import { useDependencyInjection } from '@/Presentations/Hooks/DependencyInjection'
import { RecipeTag } from '@/Presentations/Pages/Recipes/RecipeTag'
import { RecipeTagForm } from '@/Presentations/Pages/Recipes/RecipeTag/Form'
import { TagValidationData } from '../../Validations/Recipes/TagValidation'

export const TagFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return <RecipeTag _tag={makeInjection('ITagService')} />
}

export const TagFormFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return (
    <RecipeTagForm
      _validation={TagValidationData()}
      _tag={makeInjection('ITagService')}
      _category={makeInjection('ICategoryService')}
    />
  )
}
