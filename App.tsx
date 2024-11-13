import {ThemeProvider} from 'styled-components'
import {Home} from './src/screens/Home'
import theme from './src/styles/theme'

import {queryClient} from './src/libs/react-query'
import {QueryClientProvider} from '@tanstack/react-query'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
