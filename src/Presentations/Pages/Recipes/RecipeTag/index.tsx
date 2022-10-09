import { Tag } from '@/Application/Entries/Recipes/Tag'
import { ITagService } from '@/Application/Interfaces/Recipes/ITagService'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterTagModel } from '@/Application/Models/Recipes/FilterTagModel'
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
  _tag: ITagService
}

export const RecipeTag = ({ _tag }: Props) => {
  const [state, setState] = useState({
    response: { total: 0 } as PaginationResponseModel<Tag[]>,
  })

  const [searchParams] = useSearchParams()
  const word = searchParams.get('word')

  const navigate = useNavigate()
  const { addError, addSuccess } = useToast()
  const pagination = usePagination()

  const handleDelete = (guid: string) => {
    _tag
      .Delete(guid)
      .then(() => addSuccess(`Tag has deleted successfully.`))
      .catch(err => addError(err.message))
  }

  useEffect(() => {
    const filter = { word, ...pagination } as FilterTagModel
    if (pagination.itemsPerPage > 0) {
      _tag
        .GetAll(filter)
        .then(result => setState(old => ({ ...old, response: result })))
    }
  }, [pagination])

  return (
    <Container search title="Recipe Tags">
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
            {state.response.result?.map(tag => (
              <Row key={tag.guid}>
                <Col data-label="Name">{tag.name}</Col>
                <Col data-label="Category">{tag.recipeCategoryGuid}</Col>
                <Col data-label="Active">
                  {tag.active ? <FaCheck /> : <FaTimes />}
                </Col>
                <Col>
                  <Group align="right">
                    <IconButton
                      icon={FaPencilAlt}
                      title="Edit"
                      onClick={() => navigate(`/recipe/tags/form/${tag.guid}`)}
                    />
                    <IconButton
                      icon={FaTrash}
                      title="Delete"
                      onClick={() => handleDelete(tag.guid)}
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
