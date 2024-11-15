import {registerChecklists} from './register-checklist'
import {api} from '../libs/axios'
import {CreateChecklistBody} from './register-checklist'

jest.mock('../libs/axios')

const mockedApi = api as jest.Mocked<typeof api>

describe('API registerChecklists', () => {
  it('deve criar um checklist com sucesso', async () => {
    const mockResponse = {
      data: {
        idCreated: ['1'],
      },
    }

    mockedApi.post.mockResolvedValue(mockResponse)

    const data: CreateChecklistBody = {
      checklists: [
        {
          _id: '1',
          type: 'type',
          amount_of_milk_produced: 100,
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
          number_of_cows_head: 10,
          had_supervision: true,
          location: {
            latitude: 1,
            longitude: 1,
          },
          created_at: '2024-11-15T13:06:34.168Z',
          updated_at: '2024-11-15T13:06:34.168Z',
        },
      ],
    }

    const result = await registerChecklists(data)
    expect(result).toEqual(mockResponse.data)
  })

  it('deve retornar um erro quando ocorrer um erro na API', async () => {
    const mockError = new Error('API error')

    mockedApi.post.mockRejectedValue(mockError)

    const data: CreateChecklistBody = {
      checklists: [
        {
          _id: '1',
          type: 'type',
          amount_of_milk_produced: 100,
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
          number_of_cows_head: 10,
          had_supervision: true,
          location: {
            latitude: 1,
            longitude: 1,
          },
          created_at: '2024-11-15T13:06:34.168Z',
          updated_at: '2024-11-15T13:06:34.168Z',
        },
      ],
    }

    await expect(registerChecklists(data)).rejects.toThrow(mockError)
  })
})
