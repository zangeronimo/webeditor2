import { Recipe as RecipeEntity } from '@/Application/Entities/Recipes/Recipe'
import { IRecipeService } from '@/Application/Interfaces/Recipes/IRecipeService'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterRecipeModel } from '@/Application/Models/Recipes/Recipe/FilterRecipeModel'
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
import { FaCheck, FaTimes, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useSearchParams, useNavigate } from 'react-router-dom'

type Props = {
  _recipe: IRecipeService
}

export const Recipe = ({ _recipe }: Props) => {
  const [state, setState] = useState({
    response: { total: 0 } as PaginationResponseModel<RecipeEntity[]>,
    refresh: false,
  })

  const [searchParams] = useSearchParams()
  const word = searchParams.get('word') ?? ''

  const navigate = useNavigate()
  const { addError, addSuccess } = useToast()
  const pagination = usePagination()

  const handleDelete = (guid: string) => {
    _recipe
      .Delete(guid)
      .then(() => {
        addSuccess(`Recipe has deleted successfully.`)
        setState(old => ({ ...old, refresh: !old.refresh }))
      })
      .catch(err => addError(err.message))
  }

  useEffect(() => {
    const filter = { word, ...pagination } as FilterRecipeModel
    if (pagination.itemsPerPage > 0) {
      _recipe
        .GetAll(filter)
        .then(result => setState(old => ({ ...old, response: result })))
    }
  }, [pagination, state.refresh])

  return (
    <Container search title="Recipe Recipes">
      <Box direction="column">
        <Group align="right">
          <Button onClick={() => navigate('form')}>Create</Button>
        </Group>
        <DataGrid pagination={state.response.total}>
          <Header>
            <Row>
              <Col orderBy="name" header>
                Name
              </Col>
              <Col orderBy="recipeCategoryGuid" header>
                Category
              </Col>
              <Col orderBy="active" header>
                Active
              </Col>
              <Col header> </Col>
            </Row>
          </Header>
          <Body>
            {state.response.result?.map(recipe => (
              <Row key={recipe.guid}>
                <Col data-label="Name">{recipe.name}</Col>
                <Col data-label="Category">{recipe.recipeCategory.name}</Col>
                <Col data-label="Active">
                  {recipe.active ? <FaCheck /> : <FaTimes />}
                </Col>
                <Col>
                  <Group align="right">
                    <IconButton
                      icon={FaPencilAlt}
                      title="Edit"
                      onClick={() => navigate(`/recipes/form/${recipe.guid}`)}
                    />
                    <IconButton
                      icon={FaTrash}
                      title="Delete"
                      onClick={() => handleDelete(recipe.guid)}
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
