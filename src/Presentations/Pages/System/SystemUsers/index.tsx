import { User } from '@/Application/Entities/System/User'
import { IUserService } from '@/Application/Interfaces/System/IUserService'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterUserModel } from '@/Application/Models/System/FilterUserModel'
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
import { useEffect, useState } from 'react'
import { FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'

type Props = {
  _user: IUserService
}

export const SystemUsers = ({ _user }: Props) => {
  const [searchParams] = useSearchParams()
  const word = searchParams.get('word')

  const [state, setState] = useState({
    response: { total: 0 } as PaginationResponseModel<User[]>,
  })
  const pagination = usePagination()

  useEffect(() => {
    const filter = { word, ...pagination } as FilterUserModel
    if (pagination.itemsPerPage > 0) {
      _user
        .GetAll(filter)
        .then(result => setState(old => ({ ...old, response: result })))
    }
  }, [pagination])

  return (
    <Container search title="System users">
      <Box>
        <DataGrid pagination={state.response.total}>
          <Header>
            <Row>
              <Col orderBy="name" header>
                Name
              </Col>
              <Col orderBy="email" header>
                Email
              </Col>
              <Col orderBy="active" header>
                Active
              </Col>
              <Col header> </Col>
            </Row>
          </Header>
          <Body>
            {state.response.result?.map(user => (
              <Row key={user.guid}>
                <Col data-label="Name">{user.name}</Col>
                <Col data-label="Email">{user.email}</Col>
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

