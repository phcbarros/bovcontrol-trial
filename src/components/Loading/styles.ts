import styled from 'styled-components/native'

import theme from '../../styles/theme'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${theme.COLORS.backgroundPrimary};
`

export const LoadIndicator = styled.ActivityIndicator.attrs(() => ({
  color: theme.COLORS.text,
}))``
