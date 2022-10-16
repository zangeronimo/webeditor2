import { Routes as RoutesDom, Route } from 'react-router-dom'
import { Dashboard } from '../Pages/Dashboard'
import { IsAuthenticated } from './Middleware/IsAuthenticated'
import { RecipeRate } from '../Pages/Recipes/RecipeRate'
import { AuthFactory } from '@/Application/Factories/Pages/System/AuthFactory'
import { ProfileFactory } from '@/Application/Factories/Pages/System/ProfileFactory'
import { UserFactory } from '@/Application/Factories/Pages/System/UserFactory'
import {
  TagFactory,
  TagFormFactory,
} from '@/Application/Factories/Pages/Recipes/TagFactory'
import {
  CategoryFactory,
  CategoryFormFactory,
} from '@/Application/Factories/Pages/Recipes/CategoryFactory'
import {
  RecipeFactory,
  RecipeFormFactory,
} from '@/Application/Factories/Pages/Recipes/RecipeFactory'
import { ImageFactory } from '@/Application/Factories/Pages/Recipes/ImageFactory'

export const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/auth" element={<AuthFactory />} />

      <Route
        path="/"
        element={
          <IsAuthenticated>
            <Dashboard />
          </IsAuthenticated>
        }
      />

      <Route
        path="/recipe/categories"
        element={
          <IsAuthenticated>
            <CategoryFactory />
          </IsAuthenticated>
        }
      />
      <Route
        path="/recipe/categories/form"
        element={
          <IsAuthenticated>
            <CategoryFormFactory />
          </IsAuthenticated>
        }
      >
        <Route
          path=":guid"
          element={
            <IsAuthenticated>
              <CategoryFormFactory />
            </IsAuthenticated>
          }
        />
      </Route>

      <Route
        path="/recipe/images"
        element={
          <IsAuthenticated>
            <ImageFactory />
          </IsAuthenticated>
        }
      />
      <Route
        path="/recipe/tags"
        element={
          <IsAuthenticated>
            <TagFactory />
          </IsAuthenticated>
        }
      />
      <Route
        path="/recipe/tags/form"
        element={
          <IsAuthenticated>
            <TagFormFactory />
          </IsAuthenticated>
        }
      >
        <Route
          path=":guid"
          element={
            <IsAuthenticated>
              <TagFormFactory />
            </IsAuthenticated>
          }
        />
      </Route>
      <Route
        path="/recipe/rates"
        element={
          <IsAuthenticated>
            <RecipeRate />
          </IsAuthenticated>
        }
      />
      <Route
        path="/recipes"
        element={
          <IsAuthenticated>
            <RecipeFactory />
          </IsAuthenticated>
        }
      />
      <Route
        path="/recipes/form"
        element={
          <IsAuthenticated>
            <RecipeFormFactory />
          </IsAuthenticated>
        }
      >
        <Route
          path=":guid"
          element={
            <IsAuthenticated>
              <RecipeFormFactory />
            </IsAuthenticated>
          }
        />
      </Route>

      <Route
        path="/system/profile"
        element={
          <IsAuthenticated>
            <ProfileFactory />
          </IsAuthenticated>
        }
      />
      <Route
        path="/system/users"
        element={
          <IsAuthenticated>
            <UserFactory />
          </IsAuthenticated>
        }
      />
    </RoutesDom>
  )
}
