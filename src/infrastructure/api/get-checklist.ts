import {api} from './axios'
import {GetChecklistResponse} from './responses/get-checklist'

export async function getChecklist(): Promise<GetChecklistResponse[]> {
  const {data} = await api.get<GetChecklistResponse[]>('/checklist')

  return data.toReversed().slice(0, 30)
}
