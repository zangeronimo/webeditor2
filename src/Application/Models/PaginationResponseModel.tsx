export class PaginationResponseModel<t> {
  result: t
  itemsPerPage: number
  page: number
  total: number
}
