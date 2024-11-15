import {AxiosError} from 'axios'
import {api} from './axios'

export interface UpdateChecklistBody {
  type: string
  amount_of_milk_produced: number
  number_of_cows_head: number
  had_supervision: boolean
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
  created_at: string
  updated_at: string
}

export async function updateChecklist(
  id: string,
  data: UpdateChecklistBody,
): Promise<void> {
  try {
    await api.put<UpdateChecklistBody>(`/checklist/${id}`, data)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`updateChecklist: ${error.message}`)
    }

    throw new Error('updateChecklist: unknown error')
  }
}
