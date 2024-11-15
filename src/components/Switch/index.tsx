import {Controller, UseControllerProps} from 'react-hook-form'
import {SwitchProps} from 'react-native'
import {Container, Input, Error, Label, Group, Icon, Control} from './styles'
import clsx from 'clsx'
import React from 'react'
import {Feather, FontAwesome6} from '@expo/vector-icons'

type Props = {
  icon: keyof typeof FontAwesome6.glyphMap
  formProps: UseControllerProps
  inputProps: SwitchProps
  error?: string
}

export function Switch({formProps, icon, error = '', inputProps}: Props) {
  return (
    <Controller
      {...formProps}
      name="hadSupervision"
      render={({field}) => (
        <Container>
          <Label>Teve Supervisão?</Label>
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
              value={field.value}
              onValueChange={field.onChange}
              {...inputProps}
            />
          </Group>
        </Container>
      )}
    />
  )
}
