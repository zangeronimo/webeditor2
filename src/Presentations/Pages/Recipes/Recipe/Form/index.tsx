import { Category } from '@/Application/Entities/Recipes/Category'
import { Recipe } from '@/Application/Entities/Recipes/Recipe'
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
import { ITagService } from '@/Application/Interfaces/Recipes/ITagService'
import { FilterTagModel } from '@/Application/Models/Recipes/Tag/FilterTagModel'
import { Tag } from '@/Application/Entities/Recipes/Tag'
import { File2Base64 } from '@/Presentations/Utils/File2Base64'
import { Galery, ImageGalery } from '@/Presentations/Components/Galery'

type Props = {
  _validation: IValidation
  _recipe: IRecipeService
  _category: ICategoryService
  _tag: ITagService
}

const URL_BACK = '/recipes'

export const RecipeForm = ({
  _validation,
  _recipe,
  _category,
  _tag,
}: Props) => {
  const [state, setState] = useState({
    recipe: { active: ActiveEnum.Sim } as Recipe,
    imagesGalery: [] as ImageGalery[],
    image: {} as File,
    categories: [] as Category[],
    tags: [] as Tag[],
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

  const handleGetTags = (categoryGuid: string) => {
    if (categoryGuid) {
      const filter = new FilterTagModel()
      filter.recipeCategoryGuid = categoryGuid
      filter.itemsPerPage = 9999
      filter.orderBy = 'name'
      filter.asc = true

      _tag.GetAll(filter).then(result => {
        setState(old => ({ ...old, tags: result.result }))
      })
    } else {
      setState(old => ({ ...old, tags: [] }))
    }
  }

  useEffect(() => {
    if (guid) {
      _recipe.GetByGuid(guid).then(result => {
        let galery = [] as ImageGalery[]
        if (result.recipeImages.length > 0) {
          galery = result.recipeImages.map(img => ({
            key: img.guid,
            name: '',
            path: img.path,
            active: img.active,
          }))
        }

        setState(old => ({ ...old, recipe: result, imagesGalery: galery }))
        handleGetTags(result.recipeCategoryGuid)
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

  const handleSave = async () => {
    const payload = new RecipePayloadModel(state.recipe)

    if (state.image?.type) {
      const [type, image64] = (await File2Base64(state.image)).split(',')
      if (!type.includes('image')) {
        addError('Imagem com formato inválido')
        return
      }
      payload.image = image64
    }

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

  const hasTag = (guid: string) => {
    return (
      state.recipe?.recipeTags?.find(tag => tag.guid === guid)?.guid === guid
    )
  }

  const handleClickTag = (guid: string) => {
    let tags = state.recipe.recipeTags
    if (hasTag(guid)) {
      tags = state.recipe.recipeTags.filter(tag => tag.guid !== guid)
    } else {
      const tag = state.tags.find(tag => tag.guid === guid)
      tags.push(tag)
    }

    setState(old => ({
      ...old,
      recipe: { ...old.recipe, recipeTags: tags } as Recipe,
    }))
  }

  const handleSetImage = (image: File) => {
    setState(old => ({ ...old, image }))
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
            onChange={e => {
              handleChange('recipeCategoryGuid', e.currentTarget.value)
              handleGetTags(e.currentTarget.value)
            }}
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
          {state.tags.map(tag => (
            <span key={tag.guid}>
              <input
                type="checkbox"
                checked={hasTag(tag.guid)}
                value={tag.guid}
                onChange={e => handleClickTag(e.currentTarget.value)}
              />{' '}
              {tag.name}
            </span>
          ))}
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
          <input
            type="file"
            name="image"
            onChange={e => handleSetImage(e.currentTarget.files[0])}
          />
        </Group>
        <Group>
          <Galery images={state.imagesGalery} />
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
