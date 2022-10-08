import { useDependencyInjection } from '@/Presentations/Hooks/DependencyInjection'
import { RecipeCategory } from '@/Presentations/Pages/Recipes/RecipeCategory'
import { RecipeCategoryForm } from '@/Presentations/Pages/Recipes/RecipeCategory/Form'
import { CategoryValidationData } from '../../Validations/Recipes/CategoryValidation'

export const CategoryFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return <RecipeCategory _category={makeInjection('ICategoryService')} />
}

export const CategoryFormFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return (
    <RecipeCategoryForm
      _validation={CategoryValidationData()}
      _category={makeInjection('ICategoryService')}
    />
  )
}
