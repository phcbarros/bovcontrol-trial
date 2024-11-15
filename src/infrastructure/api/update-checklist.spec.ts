import {updateChecklist, UpdateChecklistBody} from './update-checklist'
import {api} from './axios'
import {AxiosError} from 'axios'

jest.mock('./axios')

const mockedApi = api as jest.Mocked<typeof api>

describe('API updateChecklist', () => {
  it('deve atualizar um checklist com sucesso', async () => {
    const id = '123'
    const data: UpdateChecklistBody = {
      type: 'type',
      amount_of_milk_produced: 100,
      number_of_cows_head: 10,
      had_supervision: true,
      farmer: {
        name: 'farmer',
        city: 'city',
      },
      from: {
        name: 'from',
      },
      to: {
        name: 'to',
      },
      location: {
        latitude: 1,
        longitude: 1,
      },
    }

    mockedApi.put.mockResolvedValue({})

    await updateChecklist(id, data)

    expect(mockedApi.put).toHaveBeenCalledTimes(1)
    expect(mockedApi.put).toHaveBeenCalledWith(`/checklist/${id}`, data)
  })

  it('deve lançar um erro quando ocorrer um erro ao atualizar um checklist', async () => {
    const id = '123'
    const data: UpdateChecklistBody = {
      type: 'type',
      amount_of_milk_produced: 100,
      number_of_cows_head: 10,
      had_supervision: true,
      farmer: {
        name: 'farmer',
        city: 'city',
      },
      from: {
        name: 'from',
      },
      to: {
        name: 'to',
      },
      location: {
        latitude: 1,
        longitude: 1,
      },
    }

    mockedApi.put.mockRejectedValue(new AxiosError('API error'))

    await expect(updateChecklist(id, data)).rejects.toThrow(Error)
  })

  it('deve lançar erro quando ocorrer um erro desconhecido', async () => {
    const id = '123'
    const data = {} as any

    mockedApi.put.mockRejectedValue(new Error('unknown error'))
    await expect(updateChecklist(id, data)).rejects.toThrow(Error)
  })
})
