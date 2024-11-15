import {TextProps} from 'react-native'
import {Title as StyledTitle} from './styles'

type Props = TextProps

export function Title({children, ...rest}: Props) {
  return <StyledTitle {...rest}>{children}</StyledTitle>
}
