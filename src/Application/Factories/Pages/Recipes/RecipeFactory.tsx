import { useDependencyInjection } from '@/Presentations/Hooks/DependencyInjection'
import { Recipe } from '@/Presentations/Pages/Recipes/Recipe'
import { RecipeForm } from '@/Presentations/Pages/Recipes/Recipe/Form'
import { RecipeValidationData } from '../../Validations/Recipes/RecipeValidation'

export const RecipeFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return <Recipe _recipe={makeInjection('IRecipeService')} />
}

export const RecipeFormFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return (
    <RecipeForm
      _validation={RecipeValidationData()}
      _recipe={makeInjection('IRecipeService')}
      _category={makeInjection('ICategoryService')}
      _tag={makeInjection('ITagService')}
    />
  )
}
