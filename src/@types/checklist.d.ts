export type RegisterChecklistFormData = {
  farmer: string
  farm: string
  city: string
  supervisor: string
  checklistType: string
  amountOfMilkProduced: string
  numberOfCowsHead: string
  hadSupervision: boolean
  latitude: string
  longitude: string
}

export type UpdateChecklistFormData = RegisterChecklistFormData & {
  id: string
}
