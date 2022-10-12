import { Category } from '@/Application/Entries/Recipes/Category'
import { Recipe } from '@/Application/Entries/Recipes/Recipe'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'
import { ICategoryService } from '@/Application/Interfaces/Recipes/ICategoryService'
import { IRecipeService } from '@/Application/Interfaces/Recipes/IRecipeService'
import { FilterCategoryModel } from '@/Application/Models/Recipes/Category/FilterCategoryModel'
import { RecipePayloadModel } from '@/Application/Models/Recipes/Recipe/RecipePayloadModel'
import { IValidation } from '@/Infra/Validation/Interfaces/IValidation'
import { Box } from '@/Presentations/Components/Box'
import { Container } from '@/Presentations/Components/Container'
import { Editor } from '@/Presentations/Components/Form/Editor'
import { Button } from '@/Presentations/Components/Form/Button'
import { Input } from '@/Presentations/Components/Form/Input'
import { Select } from '@/Presentations/Components/Form/Select'
import { Group } from '@/Presentations/Components/Group'
import { useToast } from '@/Presentations/Hooks/Toast'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {
  _validation: IValidation
  _recipe: IRecipeService
  _category: ICategoryService
}

const URL_BACK = '/recipes'

export const RecipeForm = ({ _validation, _recipe, _category }: Props) => {
  const [state, setState] = useState({
    recipe: { active: ActiveEnum.Sim } as Recipe,
    categories: [] as Category[],
    isFormInvalid: true,
    recipeCategoryError: '',
    ingredientsError: '',
    preparationError: '',
    nameError: '',
  })

  const { guid } = useParams()
  const navigate = useNavigate()
  const { addSuccess, addError } = useToast()

  useEffect(() => {
    const filter = new FilterCategoryModel()
    filter.itemsPerPage = 9999
    filter.orderBy = 'name'
    filter.asc = true

    _category.GetAll(filter).then(res => {
      setState(old => ({ ...old, categories: res.result }))
    })
  }, [])

  const validate = (field: string): void => {
    const { name, recipeCategoryGuid, ingredients, preparation } = state.recipe
    const formData = {
      name,
      recipeCategoryGuid,
      ingredients,
      preparation,
    }
    setState(old => ({
      ...old,
      [`${field}Error`]: _validation.validate(field, formData),
    }))
    setState(old => ({
      ...old,
      isFormInvalid:
        !!old.nameError ||
        !!old.recipeCategoryError ||
        !!old.ingredientsError ||
        !!old.preparationError,
    }))
  }

  useEffect(() => {
    validate('name')
    validate('recipeCategoryGuid')
    validate('ingredients')
    validate('preparation')
  }, [state.recipe])

  useEffect(() => {
    if (guid) {
      _recipe.GetByGuid(guid).then(result => {
        setState(old => ({ ...old, recipe: result }))
      })
    }
  }, [guid])

  const handleChange = (key: string, value: unknown) => {
    setState(old => ({
      ...old,
      recipe: {
        ...old.recipe,
        [key]: value,
      } as Recipe,
    }))
  }

  const handleSetIngredients = (value: string) => {
    handleChange('ingredients', value)
  }

  const handleSetPreparation = (value: string) => {
    handleChange('preparation', value)
  }

  const handleSave = () => {
    const payload = new RecipePayloadModel(state.recipe)

    _recipe
      .Save(payload)
      .then(() => {
        addSuccess()
        navigate(URL_BACK)
      })
      .catch(err => {
        addError(err.message)
      })
  }

  return (
    <Container title="Recipe Recipe - Form">
      <Box direction="column">
        <Group>
          <Input
            label="Name"
            name="name"
            defaultValue={state.recipe.name}
            onChange={e => handleChange('name', e.currentTarget.value)}
            error={state.nameError}
          />
          <Select
            label="Category"
            name="recipeCategoryGuid"
            defaultValue={state.recipe.recipeCategoryGuid}
            error={state.recipeCategoryError}
            onChange={e =>
              handleChange('recipeCategoryGuid', e.currentTarget.value)
            }
          >
            <option value="">Select</option>
            {state.categories.map(category => (
              <option key={category.guid} value={category.guid}>
                {category.name}
              </option>
            ))}
          </Select>
          <Select
            label="Active"
            name="active"
            defaultValue={state.recipe.active}
            onChange={e => handleChange('active', +e.currentTarget.value)}
          >
            <option value={ActiveEnum.Não}>Não</option>
            <option value={ActiveEnum.Sim}>Sim</option>
          </Select>
        </Group>
        <Group>
          <Editor
            label="Ingredients"
            name="ingredients"
            data={state.recipe.ingredients}
            setContent={handleSetIngredients}
            error={state.ingredientsError}
          />
        </Group>
        <Group>
          <Editor
            label="Preparation"
            name="preparation"
            data={state.recipe.preparation}
            setContent={handleSetPreparation}
            error={state.preparationError}
          />
        </Group>
        <Group>
          <Button skin="secondary" onClick={() => navigate(URL_BACK)}>
            Voltar
          </Button>
          <Button onClick={() => handleSave()} disabled={state.isFormInvalid}>
            Salvar
          </Button>
        </Group>
      </Box>
    </Container>
  )
}
