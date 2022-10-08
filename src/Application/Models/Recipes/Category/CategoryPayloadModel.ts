import { Category } from '@/Application/Entries/Recipes/Category'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'

export class CategoryPayloadModel {
  guid?: string
  name: string
  active: ActiveEnum

  constructor(category: Category) {
    this.guid = category.guid
    this.name = category.name
    this.active = category.active
  }
}
