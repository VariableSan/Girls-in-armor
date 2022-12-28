import { IExample } from '../interfaces/Example.interface'

export class Example implements IExample {
  property: string
  method: () => string
}
