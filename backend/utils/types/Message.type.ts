import { EColor } from '../enums/Color.enum'

export type TMessage = {
  text: string
  color: EColor
  data?: any
}
