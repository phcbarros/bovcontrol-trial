import React from 'react'
import {render} from '@testing-library/react-native'
import 'jest-styled-components'
import 'jest-styled-components/native'

import {Container, Title} from './styles'
import {ThemeProvider} from 'styled-components/native'
import theme from '../../styles/theme'

describe('Button.styles', () => {
  test('Container DEVE ser igual ao snapshot', () => {
    const componente = render(<Container />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      ),
    }).toJSON()

    expect(componente).toMatchSnapshot()
  })

  test('Title DEVE ser igual ao snapshot', () => {
    const componente = render(<Title />, {
      wrapper: ({children}) => (
        <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>
      ),
    }).toJSON()

    expect(componente).toMatchSnapshot()
  })
})
