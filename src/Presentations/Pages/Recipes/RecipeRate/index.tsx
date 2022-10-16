import { Rate } from '@/Application/Entities/Recipes/Rate'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'
import { IRateService } from '@/Application/Interfaces/Recipes/IRateService'
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
import { Group } from '@/Presentations/Components/Group'
import { IconButton } from '@/Presentations/Components/IconButton'
import { usePagination } from '@/Presentations/Hooks/Pagination'
import { useToast } from '@/Presentations/Hooks/Toast'
import { useState, useEffect } from 'react'
import {
  FaCheck,
  FaTimes,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
} from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'

type Props = {
  _rate: IRateService
}

export const RecipeRate = ({ _rate }: Props) => {
  const [state, setState] = useState({
    response: { total: 0 } as PaginationResponseModel<Rate[]>,
    refresh: false,
  })

  const [searchParams] = useSearchParams()
  const word = searchParams.get('word') ?? ''

  const { addError, addSuccess } = useToast()
  const pagination = usePagination()

  const handleDelete = (guid: string) => {
    _rate
      .Delete(guid)
      .then(() => {
        addSuccess(`Recipe has deleted successfully.`)
        setState(old => ({ ...old, refresh: !old.refresh }))
      })
      .catch(err => addError(err.message))
  }

  const handleChangeState = (guid: string, state: ActiveEnum) => {
    _rate
      .UpdateState(guid, state)
      .then(() => {
        addSuccess(`State has changed successfully.`)
        setState(old => ({ ...old, refresh: !old.refresh }))
      })
      .catch(err => addError(err.message))
  }

  useEffect(() => {
    const filter = { word, ...pagination } as FilterRecipeModel
    if (pagination.itemsPerPage > 0) {
      _rate
        .GetAll(filter)
        .then(result => setState(old => ({ ...old, response: result })))
    }
  }, [pagination, state.refresh])

  return (
    <Container search title="Recipe Rates">
      <Box>
        <DataGrid pagination={state.response.total}>
          <Header>
            <Row>
              <Col orderBy="rate" header>
                Rate
              </Col>
              <Col header>Comment</Col>
              <Col orderBy="active" header>
                Active
              </Col>
              <Col header> </Col>
            </Row>
          </Header>
          <Body>
            {state.response.result?.map(rate => (
              <Row key={rate.guid}>
                <Col data-label="Rate">{rate.rate}</Col>
                <Col data-label="Comment">{rate.comment}</Col>
                <Col data-label="Active">
                  {rate.active ? <FaCheck /> : <FaTimes />}
                </Col>
                <Col>
                  <Group align="right">
                    <IconButton
                      icon={rate.active ? FaToggleOn : FaToggleOff}
                      title={rate.active ? 'disable' : 'enable'}
                      onClick={() =>
                        handleChangeState(
                          rate.guid,
                          rate.active ? ActiveEnum.Não : ActiveEnum.Sim,
                        )
                      }
                    />
                    <IconButton
                      icon={FaTrash}
                      title="Delete"
                      onClick={() => handleDelete(rate.guid)}
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
