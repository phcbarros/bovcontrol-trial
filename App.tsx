import {ThemeProvider} from 'styled-components/native'
import theme from './src/styles/theme'

import {queryClient} from './src/libs/react-query'
import {QueryClientProvider} from '@tanstack/react-query'
import {Routes} from './src/routes'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
