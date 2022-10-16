import { Image } from '@/Application/Entities/Recipes/Image'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'
import { IImageService } from '@/Application/Interfaces/Recipes/IImageService'
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
  _image: IImageService
}

export const RecipeImage = ({ _image }: Props) => {
  const [state, setState] = useState({
    response: { total: 0 } as PaginationResponseModel<Image[]>,
    refresh: false,
  })

  const [searchParams] = useSearchParams()
  const word = searchParams.get('word') ?? ''

  const { addError, addSuccess } = useToast()
  const pagination = usePagination()

  const handleDelete = (guid: string) => {
    _image
      .Delete(guid)
      .then(() => {
        addSuccess(`Recipe has deleted successfully.`)
        setState(old => ({ ...old, refresh: !old.refresh }))
      })
      .catch(err => addError(err.message))
  }

  const handleChangeState = (guid: string, state: ActiveEnum) => {
    _image
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
      _image
        .GetAll(filter)
        .then(result => setState(old => ({ ...old, response: result })))
    }
  }, [pagination, state.refresh])

  return (
    <Container search title="Recipe Images">
      <Box>
        <DataGrid pagination={state.response.total}>
          <Header>
            <Row>
              <Col header>Thumb</Col>
              <Col orderBy="guid" header>
                Guid
              </Col>
              <Col orderBy="path" header>
                Path
              </Col>
              <Col orderBy="active" header>
                Active
              </Col>
              <Col header> </Col>
            </Row>
          </Header>
          <Body>
            {state.response.result?.map(image => (
              <Row key={image.guid}>
                <Col data-label="Thumb">
                  <img
                    style={{ maxWidth: '80px', maxHeight: '80px' }}
                    src={`${process.env.API_URL}/${image.path}`}
                    alt=""
                  />
                </Col>
                <Col data-label="Guid">{image.guid}</Col>
                <Col data-label="Path">{image.path}</Col>
                <Col data-label="Active">
                  {image.active ? <FaCheck /> : <FaTimes />}
                </Col>
                <Col>
                  <Group align="right">
                    <IconButton
                      icon={image.active ? FaToggleOn : FaToggleOff}
                      title={image.active ? 'disable' : 'enable'}
                      onClick={() =>
                        handleChangeState(
                          image.guid,
                          image.active ? ActiveEnum.Não : ActiveEnum.Sim,
                        )
                      }
                    />
                    <IconButton
                      icon={FaTrash}
                      title="Delete"
                      onClick={() => handleDelete(image.guid)}
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
