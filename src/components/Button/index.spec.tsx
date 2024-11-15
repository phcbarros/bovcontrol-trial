import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import {Button} from '.'
import {ThemeProvider} from 'styled-components/native'
import theme from '../../styles/theme'

describe('Button', () => {
  let wrapper: RenderAPI
  const mockedOnPress = jest.fn()

  beforeEach(() => {
    wrapper = render(
      <Button title="Novo Checklist" onPress={mockedOnPress} />,
      {
        wrapper: ({children}) => (
          <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>
        ),
      },
    )
  })

  it('deve renderizar titulo', () => {
    expect(wrapper.getByText('Novo Checklist')).toBeTruthy()
  })

  it('deve chamar onPress', () => {
    const button = wrapper.getByText('Novo Checklist')
    fireEvent.press(button)
    expect(mockedOnPress).toHaveBeenCalled()
  })
})
