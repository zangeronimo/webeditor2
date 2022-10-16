import { Category } from '@/Application/Entities/Recipes/Category'
import { Tag } from '@/Application/Entities/Recipes/Tag'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'
import { ICategoryService } from '@/Application/Interfaces/Recipes/ICategoryService'
import { ITagService } from '@/Application/Interfaces/Recipes/ITagService'
import { FilterCategoryModel } from '@/Application/Models/Recipes/Category/FilterCategoryModel'
import { TagPayloadModel } from '@/Application/Models/Recipes/Tag/TagPayloadModel'
import { IValidation } from '@/Infra/Validation/Interfaces/IValidation'
import { Box } from '@/Presentations/Components/Box'
import { Container } from '@/Presentations/Components/Container'
import { Button } from '@/Presentations/Components/Form/Button'
import { Input } from '@/Presentations/Components/Form/Input'
import { Select } from '@/Presentations/Components/Form/Select'
import { Group } from '@/Presentations/Components/Group'
import { useToast } from '@/Presentations/Hooks/Toast'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {
  _validation: IValidation
  _tag: ITagService
  _category: ICategoryService
}

const URL_BACK = '/recipe/tags'

export const RecipeTagForm = ({ _validation, _tag, _category }: Props) => {
  const [state, setState] = useState({
    tag: { active: ActiveEnum.Sim } as Tag,
    categories: [] as Category[],
    isFormInvalid: true,
    recipeCategoryGuidError: '',
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
    const { name, recipeCategoryGuid } = state.tag
    const formData = { name, recipeCategoryGuid }
    setState(old => ({
      ...old,
      [`${field}Error`]: _validation.validate(field, formData),
    }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.nameError || !!old.recipeCategoryGuidError,
    }))
  }

  useEffect(() => {
    validate('name')
    validate('recipeCategoryGuid')
  }, [state.tag])

  useEffect(() => {
    if (guid) {
      _tag.GetByGuid(guid).then(result => {
        setState(old => ({ ...old, tag: result }))
      })
    }
  }, [guid])

  const handleChange = (key: string, value: unknown) => {
    setState(old => ({
      ...old,
      tag: {
        ...old.tag,
        [key]: value,
      } as Tag,
    }))
  }

  const handleSave = () => {
    const payload = new TagPayloadModel(state.tag)

    _tag
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
    <Container title="Recipe Tag - Form">
      <Box direction="column">
        <Group>
          <Input
            label="Name"
            name="name"
            defaultValue={state.tag.name}
            onChange={e => handleChange('name', e.currentTarget.value)}
            error={state.nameError}
          />
          <Select
            label="Category"
            name="recipeCategoryGuid"
            defaultValue={state.tag.recipeCategoryGuid}
            error={state.recipeCategoryGuidError}
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
            defaultValue={state.tag.active}
            onChange={e => handleChange('active', +e.currentTarget.value)}
          >
            <option value={ActiveEnum.Não}>Não</option>
            <option value={ActiveEnum.Sim}>Sim</option>
          </Select>
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

