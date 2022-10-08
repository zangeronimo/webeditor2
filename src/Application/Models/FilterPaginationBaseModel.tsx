export abstract class FilterPaginationBaseModel {
  orderBy?: string
  asc?: boolean
  page: number
  itemsPerPage: number
}
