import {api} from '../libs/axios'

export interface GetChecklistQuery {
  _id: number
  type: string
  amount_of_milk_produced: string
  farmer: {
    name: string
    city: string
  }
  from: {
    name: string
  }
  to: {
    name: string
  }
  number_of_cows_head: string
  had_supervision: boolean
  location: {
    latitude: string
    longitude: string
  }
  created_at: string
  updated_at: string
}

export async function getChecklist() {
  const response = await api.get<GetChecklistQuery[]>('/checklist')

  return response.data
}
