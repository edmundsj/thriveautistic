import {Insert, Row} from "@/data/generic";

type Tag = Row<'tags'>
type TagInsert = Insert<'tags'>
export function createTag(tag:Partial<Tag>): Tag {
  return {
    id: 0,
    created_at: '',
    title: '',
    ...tag
  }
}