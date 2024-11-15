import {getChecklist} from './get-checklist'
import {api} from './axios'

jest.mock('./axios')
const mockedApi = api as jest.Mocked<typeof api>

describe('API getChecklist', () => {
  it('deve retornar a lista de checklists com sucesso', async () => {
    const mockResponse = {
      data: [
        {
          _id: 1,
          type: 'type',
          amount_of_milk_produced: 'amount',
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
          number_of_cows_head: 'number',
          had_supervision: true,
          location: {
            latitude: 'latitude',
            longitude: 'longitude',
          },
          created_at: 'created_at',
          updated_at: 'updated_at',
        },
      ],
    }

    mockedApi.get.mockResolvedValue(mockResponse)

    const result = await getChecklist()
    expect(result).toEqual(mockResponse.data)
  })

  it('deve retornar um erro ao falhar na chamada da API', async () => {
    const mockError = new Error('API error')

    mockedApi.get.mockRejectedValue(mockError)

    await expect(getChecklist()).rejects.toThrow(mockError)
  })

  it('deve retornar uma lista vazia quando a API retorna uma resposta vazia', async () => {
    const mockResponse = {
      data: [],
    }

    mockedApi.get.mockResolvedValue(mockResponse)

    const result = await getChecklist()
    expect(result).toEqual(mockResponse.data)
  })
})
