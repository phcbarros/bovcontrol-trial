import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import {Home} from '.'
import {ThemeProvider} from 'styled-components/native'
import theme from '../../styles/theme'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from '../../libs/react-query'
import {useNavigation, useRoute} from '@react-navigation/native'
import {AppRoutes} from '../../routes/app-routes'

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: () => ({
    data: [
      {
        _id: 1,
        from: {name: 'Fazendeiro 1'},
        farmer: {city: 'cidade', name: 'Fazenda 1'},
        created_at: '2024-11-13T22:40:34.279Z',
      },
    ],
  }),
}))

describe('Home', () => {
  let wrapper: RenderAPI
  beforeEach(() => {
    wrapper = render(<Home />, {
      wrapper: ({children}) => (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </QueryClientProvider>
      ),
    })
  })

  it('deve renderizar o título Checklist', async () => {
    expect(wrapper.getByText('Checklist')).toBeTruthy()
  })

  it('deve renderizar o card do Fazendeiro 1', async () => {
    expect(wrapper.getByText('Fazendeiro 1')).toBeTruthy()
  })

  it('deve navegar para a tela de detalhes', async () => {
    const useNavigationMock = useNavigation().navigate as jest.Mock

    const card = wrapper.getByTestId('card-1')
    fireEvent.press(card)

    expect(useNavigationMock).toHaveBeenCalledWith('detail', {
      item: {
        _id: 1,
        from: {name: 'Fazendeiro 1'},
        farmer: {city: 'cidade', name: 'Fazenda 1'},
        created_at: '2024-11-13T22:40:34.279Z',
      },
    })
  })

  it('deve navegar para a tela de novo checklist', async () => {
    const useNavigationMock = useNavigation().navigate as jest.Mock

    const card = wrapper.getByText('Novo Checklist')
    fireEvent.press(card)

    expect(useNavigationMock).toHaveBeenCalledWith(AppRoutes.RegisterChecklist)
  })
})
