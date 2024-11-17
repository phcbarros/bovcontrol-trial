import {Checklist} from '../../types/checklist'
import {api} from './axios'
import {GetChecklistResponse} from './responses/get-checklist'

export async function getChecklist(): Promise<Checklist[]> {
  const {data} = await api.get<GetChecklistResponse[]>('/checklist')

  return data
    .toReversed()
    .slice(0, 10)
    .map((checklist) => {
      return {
        id: checklist._id,
        type: checklist.type,
        amountOfMilkProduced: checklist.amount_of_milk_produced,
        farm: checklist.farmer.name,
        city: checklist.farmer.city,
        farmer: checklist.from.name,
        supervisor: checklist.to.name,
        numberOfCowsHead: checklist.number_of_cows_head,
        hadSupervision: checklist.had_supervision,
        latitude: checklist.location.latitude,
        longitude: checklist.location.longitude,
        createdAt: checklist.created_at,
        updatedAt: checklist.updated_at,
      }
    })
}
