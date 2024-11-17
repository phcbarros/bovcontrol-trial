import {ThemeProvider} from 'styled-components/native'
import theme from './src/styles/theme'

import {queryClient} from './src/libs/react-query'
import {QueryClientProvider} from '@tanstack/react-query'
import {Routes} from './src/routes'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import React from 'react'
import {Loading} from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
