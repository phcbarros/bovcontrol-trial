import {render, RenderAPI} from '@testing-library/react-native'
import {Item} from '.'
import {ThemeProvider} from 'styled-components/native'
import theme from '../../../styles/theme'

describe('Item', () => {
  let wrapper: RenderAPI

  it('deve renderizar a label e o value', () => {
    wrapper = render(<Item label="Nome" value="Fazendeiro 1" />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>
      ),
    })

    expect(wrapper.getByText('Nome')).toBeTruthy()
    expect(wrapper.getByText('Fazendeiro 1')).toBeTruthy()
  })
})
