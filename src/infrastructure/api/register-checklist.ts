import {AxiosError} from 'axios'
import {api} from './axios'

export interface CreateChecklistBody {
  checklists: {
    _id: string
    type: string
    amount_of_milk_produced: number
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
    location: {
      latitude: number
      longitude: number
    }
    number_of_cows_head: number
    had_supervision: boolean
    created_at: string
    updated_at: string
  }[]
}

export async function registerChecklists(
  data: CreateChecklistBody,
): Promise<CreateChecklistBody | null> {
  try {
    const response = await api.post<CreateChecklistBody>('/checklist', data)

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`registerChecklists: ${error.message}`)
    }

    throw new Error('registerChecklist: unknown error')
  }
}
