import React from 'react'
import { useFormikContext } from 'formik'

import Button from '../Button'

function SubmitButton({ title, isDisabled }) {
  const { handleSubmit } = useFormikContext()

  return <Button isDisabled={isDisabled} title={title} onPress={handleSubmit} />
}

export default SubmitButton
