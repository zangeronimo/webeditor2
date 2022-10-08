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
import { Group } from '@/Presentations/Components/Group'
import { usePagination } from '@/Presentations/Hooks/Pagination'
import { useState, useEffect } from 'react'
import { FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'

type Props = {
  _tag: ITagService
}

export const RecipeTag = ({ _tag }: Props) => {
  const [searchParams] = useSearchParams()
  const word = searchParams.get('word')

  const [state, setState] = useState({
    response: { total: 0 } as PaginationResponseModel<Tag[]>,
  })
  const pagination = usePagination()

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
      <Box>
        <DataGrid pagination={state.response.total}>
          <Header>
            <Row>
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
            {state.response.result?.map(tag => (
              <Row key={tag.guid}>
                <Col data-label="Name">{tag.name}</Col>
                <Col data-label="Active">
                  <FaCheck />
                </Col>
                <Col>
                  <Group align="right">
                    <FaPencilAlt />
                    <FaTrash />
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
