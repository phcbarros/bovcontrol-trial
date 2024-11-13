import {render, RenderAPI} from '@testing-library/react-native'
import {Home} from '.'
import {ThemeProvider} from 'styled-components/native'
import theme from '../../styles/theme'
import {Query, QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from '../../libs/react-query'

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: () => ({
    data: [
      {
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
})
