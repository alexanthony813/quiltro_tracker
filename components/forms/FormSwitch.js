import React from 'react'
import { useFormikContext } from 'formik'
import { Switch, Text, View } from 'react-native'

function FormSwitch({ name, title, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext()

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        left: '5%', // todo move this above and put styles in props
      }}
    >
      <Text>{title} </Text>
      <Switch
        value={values[name]}
        onValueChange={(value) => setFieldValue(name, value)}
        {...otherProps}
      />
    </View>
  )
}

export default FormSwitch
