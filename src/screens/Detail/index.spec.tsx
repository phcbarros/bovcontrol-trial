import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import {Detail} from '.'
import {ThemeProvider} from 'styled-components/native'
import theme from '../../styles/theme'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from '../../libs/react-query'
import {useNavigation} from '@react-navigation/native'
import {AppRoutes} from '../../routes/app-routes'

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
}))

const params = {
  item: {
    _id: 1,
    from: {name: 'Fazendeiro 1'},
    farmer: {name: 'Fazenda 1', city: 'Mogi'},
    to: {name: 'Supervisor 1'},
    location: {latitude: -23.33, longitude: 24.44},
    type: 'BCP',
    amount_of_milk_produced: '1000',
    number_of_cows_head: '10',
    had_supervision: true,
    created_at: '2024-11-13T22:40:34.279Z',
  },
}

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
  useRoute: jest.fn().mockReturnValue({
    params,
  }),
}))

describe('Detail', () => {
  let wrapper: RenderAPI
  beforeEach(() => {
    wrapper = render(<Detail />, {
      wrapper: ({children}) => (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </QueryClientProvider>
      ),
    })
  })

  // TODO: criar testID para os campos

  it('deve renderizar o nome do fazendeiro', async () => {
    expect(wrapper.getByText('Fazendeiro 1')).toBeTruthy()
  })

  it('deve renderizar o nome da Fazenda', async () => {
    expect(wrapper.getByText('Fazenda 1')).toBeTruthy()
  })

  it('deve renderizar o nome da cidade', async () => {
    expect(wrapper.getByText('Mogi')).toBeTruthy()
  })

  it('deve renderizar o tipo', async () => {
    expect(wrapper.getByText('BCP')).toBeTruthy()
  })

  it('deve renderizar a latitude', async () => {
    expect(wrapper.getByText('-23.33')).toBeTruthy()
  })

  it('deve renderizar a longitude', async () => {
    expect(wrapper.getByText('24.44')).toBeTruthy()
  })

  it('deve renderizar nome do supervisor', async () => {
    expect(wrapper.getByText('Supervisor 1')).toBeTruthy()
  })

  it('deve renderizara data de criação', async () => {
    expect(wrapper.getByText('13/11/2024')).toBeTruthy()
  })

  it('deve renderizar a data de atualização', async () => {
    expect(wrapper.getByText('13/11/2024')).toBeTruthy()
  })

  it('deve navegar para a tela de atualização', async () => {
    const useNavigationMock = useNavigation().navigate as jest.Mock

    const card = wrapper.getByText('Atualizar')
    fireEvent.press(card)

    expect(useNavigationMock).toHaveBeenCalledWith(
      AppRoutes.UpdateChecklist,
      params,
    )
  })
})
