export interface Checklist {
  id: string
  type: string
  amountOfMilkProduced: number
  farm: string
  city: string
  farmer: string
  supervisor: string
  numberOfCowsHead: number
  hadSupervision: boolean
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
}
