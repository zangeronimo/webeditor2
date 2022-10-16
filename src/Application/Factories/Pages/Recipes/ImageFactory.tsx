import { useDependencyInjection } from '@/Presentations/Hooks/DependencyInjection'
import { RecipeImage } from '@/Presentations/Pages/Recipes/RecipeImage'

export const ImageFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return <RecipeImage _image={makeInjection('IImageService')} />
}
