import {render, RenderAPI} from '@testing-library/react-native'
import {Card} from '.'
import {ThemeProvider} from 'styled-components/native'
import theme from '../../../styles/theme'

describe('Card', () => {
  let wrapper: RenderAPI

  beforeEach(() => {
    const checklist = {
      from: {name: 'Fazendeiro 1'},
      farmer: {city: 'cidade', name: 'Fazenda 1'},
      created_at: '2024-11-13T22:40:34.279Z',
    }

    wrapper = render(
      <Card
        farmer={checklist.farmer}
        from={checklist.from}
        created_at={checklist.created_at}
      />,
      {
        wrapper: ({children}) => (
          <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>
        ),
      },
    )
  })

  it('deve renderizar o nome do fazendeiro', () => {
    expect(wrapper.getByText('Fazendeiro 1')).toBeTruthy()
  })

  it('deve renderizar o nome da fazenda', () => {
    expect(wrapper.getByText('Fazenda 1')).toBeTruthy()
  })

  it('deve renderizar o nome da cidade', () => {
    expect(wrapper.getByText('cidade')).toBeTruthy()
  })

  it('deve renderizar a data de criação', () => {
    expect(wrapper.getByText('13/11/2024')).toBeTruthy()
  })
})
