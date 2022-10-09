import { Tag } from '@/Application/Entries/Recipes/Tag'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'

export class TagPayloadModel {
  guid?: string
  name: string
  recipeCategoryGuid: string
  active: ActiveEnum

  constructor(tag: Tag) {
    this.guid = tag.guid
    this.name = tag.name
    this.recipeCategoryGuid = tag.recipeCategoryGuid
    this.active = tag.active
  }
}
