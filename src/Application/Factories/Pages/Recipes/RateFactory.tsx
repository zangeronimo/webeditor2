import { useDependencyInjection } from '@/Presentations/Hooks/DependencyInjection'
import { RecipeRate } from '@/Presentations/Pages/Recipes/RecipeRate'

export const RateFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return <RecipeRate _rate={makeInjection('IRateService')} />
}
