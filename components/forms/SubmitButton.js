import React from 'react'
import { useFormikContext } from 'formik'

import Button from '../Button'

function SubmitButton({ id, styles, title, isDisabled }) {
  const { handleSubmit } = useFormikContext()

  return (
    <Button
      id={id}
      styles={styles}
      isDisabled={isDisabled}
      title={title}
      onPress={handleSubmit}
    />
  )
}

export default SubmitButton