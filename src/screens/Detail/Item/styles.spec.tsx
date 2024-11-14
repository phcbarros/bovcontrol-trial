import React from 'react'
import {render} from '@testing-library/react-native'
import 'jest-styled-components'
import 'jest-styled-components/native'

import {Container, Label, Value} from './styles'
import {ThemeProvider} from 'styled-components/native'
import theme from '../../../styles/theme'

describe('Item.styles', () => {
  test('Container DEVE ser igual ao snapshot', () => {
    const componente = render(<Container />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
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

  test('Value DEVE ser igual ao snapshot', () => {
    const componente = render(<Value />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>
      ),
    }).toJSON()

    expect(componente).toMatchSnapshot()
  })
})
