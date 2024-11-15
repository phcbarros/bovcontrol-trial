import {TextInput, TextInputProps} from 'react-native'
import {FontAwesome6} from '@expo/vector-icons'
import {Container, Group, Icon, Control, Error} from './styles'
import {Controller, UseControllerProps} from 'react-hook-form'
import {forwardRef} from 'react'
import clsx from 'clsx'

type Props = {
  icon: keyof typeof FontAwesome6.glyphMap
  formProps: UseControllerProps
  inputProps: TextInputProps
  error?: string
}

const Input = forwardRef<TextInput, Props>(
  ({icon, formProps, inputProps, error = ''}, ref) => {
    return (
      <Controller
        {...formProps}
        render={({field}) => (
          <Container>
            <Group>
              <Icon>
                <FontAwesome6
                  name={icon}
                  size={24}
                  color={clsx({
                    '#DC1637': error.length > 0,
                    '#8257e5': error.length === 0 && field.value,
                    '#999': !field.value && error.length === 0,
                  })}
                />
              </Icon>

              <Control
                ref={ref}
                value={field.value}
                onChangeText={field.onChange}
                {...inputProps}
              />
            </Group>

            {error.length > 0 && <Error>{error}</Error>}
          </Container>
        )}
      />
    )
  },
)

export {Input}
