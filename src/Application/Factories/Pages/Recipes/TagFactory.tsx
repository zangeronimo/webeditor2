import { useDependencyInjection } from '@/Presentations/Hooks/DependencyInjection'
import { RecipeTag } from '@/Presentations/Pages/Recipes/RecipeTag'

export const TagFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return <RecipeTag _tag={makeInjection('ITagService')} />
}
