import {ThemeProvider} from 'styled-components/native'
import theme from './src/styles/theme'
import {StatusBar} from 'react-native'
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
import {AppProvider} from '@realm/react'
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id="">
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent
            />
            <Routes />
          </SafeAreaProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
