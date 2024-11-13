import {render} from '@testing-library/react-native'
import {Home} from '.'
import {ThemeProvider} from 'styled-components'
import theme from '../../styles/theme'

describe('Home', () => {
  it('deve renderizar o título Checklist', () => {
    const wrapper = render(<Home />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      ),
    })

    expect(wrapper.getByText('Checklist')).toBeTruthy()
  })
})
