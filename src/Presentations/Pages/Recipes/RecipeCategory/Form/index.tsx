import { Category } from '@/Application/Entries/Recipes/Category'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'
import { ICategoryService } from '@/Application/Interfaces/Recipes/ICategoryService'
import { CategoryPayloadModel } from '@/Application/Models/Recipes/Category/CategoryPayloadModel'
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
  _category: ICategoryService
}

const URL_BACK = '/recipe/categories'

export const RecipeCategoryForm = ({ _validation, _category }: Props) => {
  const [state, setState] = useState({
    category: { active: ActiveEnum.Sim } as Category,
    isFormInvalid: true,
    nameError: '',
  })

  const { guid } = useParams()
  const navigate = useNavigate()
  const { addSuccess, addError } = useToast()

  const validate = (field: string): void => {
    const { name } = state.category
    const formData = { name }
    setState(old => ({
      ...old,
      [`${field}Error`]: _validation.validate(field, formData),
    }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.nameError,
    }))
  }

  useEffect(() => {
    validate('name')
  }, [state.category])

  useEffect(() => {
    if (guid) {
      _category.GetByGuid(guid).then(result => {
        setState(old => ({ ...old, category: result }))
      })
    }
  }, [guid])

  const handleChange = (key: string, value: unknown) => {
    setState(old => ({
      ...old,
      category: {
        ...old.category,
        [key]: value,
      } as Category,
    }))
  }

  const handleSave = () => {
    const payload = new CategoryPayloadModel(state.category)

    _category
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
    <Container title="Recipe Category - Form">
      <Box direction="column">
        <Group>
          <Input
            label="Name"
            name="name"
            defaultValue={state.category.name}
            onChange={e => handleChange('name', e.currentTarget.value)}
            error={state.nameError}
          />
          <Select
            label="Active"
            name="active"
            defaultValue={state.category.active}
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
