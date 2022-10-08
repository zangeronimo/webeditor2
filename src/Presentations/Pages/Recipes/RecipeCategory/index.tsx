import { Category } from '@/Application/Entries/Recipes/Category'
import { ICategoryService } from '@/Application/Interfaces/Recipes/ICategoryService'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterCategoryModel } from '@/Application/Models/Recipes/FilterCategoryModel'
import { Box } from '@/Presentations/Components/Box'
import { Container } from '@/Presentations/Components/Container'
import {
  DataGrid,
  Header,
  Row,
  Col,
  Body,
} from '@/Presentations/Components/DataGrid'
import { Button } from '@/Presentations/Components/Form/Button'
import { Group } from '@/Presentations/Components/Group'
import { IconButton } from '@/Presentations/Components/IconButton'
import { usePagination } from '@/Presentations/Hooks/Pagination'
import { useToast } from '@/Presentations/Hooks/Toast'
import { useState, useEffect } from 'react'
import { FaCheck, FaPencilAlt, FaTimes, FaTrash } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'

type Props = {
  _category: ICategoryService
}

export const RecipeCategory = ({ _category }: Props) => {
  const [state, setState] = useState({
    response: { total: 0 } as PaginationResponseModel<Category[]>,
  })

  const [searchParams] = useSearchParams()
  const word = searchParams.get('word')

  const navigate = useNavigate()
  const { addError, addSuccess } = useToast()
  const pagination = usePagination()

  const handleDelete = (guid: string) => {
    _category
      .Delete(guid)
      .then(() => addSuccess(`Caregory has deleted successfully.`))
      .catch(err => addError(err.message))
  }

  useEffect(() => {
    const filter = { word, ...pagination } as FilterCategoryModel
    if (pagination.itemsPerPage > 0) {
      _category
        .GetAll(filter)
        .then(result => setState(old => ({ ...old, response: result })))
    }
  }, [pagination])

  return (
    <Container search title="Recipe Categories">
      <Box direction="column">
        <Group align="right">
          <Button onClick={() => navigate('form')}>Create</Button>
        </Group>
        <DataGrid pagination={state.response.total}>
          <Header>
            <Row>
              <Col orderBy="guid" header>
                Guid
              </Col>
              <Col orderBy="name" header>
                Name
              </Col>
              <Col orderBy="active" header>
                Active
              </Col>
              <Col header> </Col>
            </Row>
          </Header>
          <Body>
            {state.response.result?.map(category => (
              <Row key={category.guid}>
                <Col data-label="Guid">{category.guid}</Col>
                <Col data-label="Name">{category.name}</Col>
                <Col data-label="Active">
                  {category.active ? <FaCheck /> : <FaTimes />}
                </Col>
                <Col>
                  <Group align="right">
                    <IconButton
                      icon={FaPencilAlt}
                      title="Edit"
                      onClick={() =>
                        navigate(`/recipe/categories/form/${category.guid}`)
                      }
                    />
                    <IconButton
                      icon={FaTrash}
                      title="Delete"
                      onClick={() => handleDelete(category.guid)}
                    />
                  </Group>
                </Col>
              </Row>
            ))}
          </Body>
        </DataGrid>
      </Box>
    </Container>
  )
}
