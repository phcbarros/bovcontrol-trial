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
          type: 'BPA',
          amount_of_milk_produced: 10,
          farmer: {name: 'fazenda', city: 'cidade'},
          from: {name: 'fazendeiro'},
          to: {name: 'supervisor'},
          number_of_cows_head: 10,
          had_supervision: true,
          location: {latitude: 1, longitude: 2},
          created_at: '2024-11-13T22:40:34.279Z',
          updated_at: '2024-11-13T22:40:34.279Z',
        },
      ],
    }

    mockedApi.get.mockResolvedValue(mockResponse)

    const result = await getChecklist()
    expect(result).toEqual([
      {
        id: 1,
        type: 'BPA',
        amountOfMilkProduced: 10,
        farm: 'fazenda',
        city: 'cidade',
        farmer: 'fazendeiro',
        supervisor: 'supervisor',
        numberOfCowsHead: 10,
        hadSupervision: true,
        latitude: 1,
        longitude: 2,
        createdAt: '2024-11-13T22:40:34.279Z',
        updatedAt: '2024-11-13T22:40:34.279Z',
      },
    ])
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
