import React from 'react'
import {render} from '@testing-library/react-native'
import 'jest-styled-components'
import 'jest-styled-components/native'

import {Container, CardTitle, Content, Label, Text} from './styles'
import {ThemeProvider} from 'styled-components/native'
import theme from '../../../styles/theme'

describe('Card.styles', () => {
  test('Container DEVE ser igual ao snapshot', () => {
    const componente = render(<Container />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      ),
    }).toJSON()

    expect(componente).toMatchSnapshot()
  })

  test('CardTitle DEVE ser igual ao snapshot', () => {
    const componente = render(<CardTitle />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>
      ),
    }).toJSON()

    expect(componente).toMatchSnapshot()
  })

  test('Content DEVE ser igual ao snapshot', () => {
    const componente = render(<Content />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>
      ),
    }).toJSON()

    expect(componente).toMatchSnapshot()
  })

  test('Label DEVE ser igual ao snapshot', () => {
    const componente = render(<Label />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>
      ),
    }).toJSON()

    expect(componente).toMatchSnapshot()
  })

  test('Text DEVE ser igual ao snapshot', () => {
    const componente = render(<Text />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>
      ),
    }).toJSON()

    expect(componente).toMatchSnapshot()
  })
})
