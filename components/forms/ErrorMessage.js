import React from 'react'

import Text from '../Text'

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null

  return <Text style={{ color: 'red' }}>{error}</Text>
}

export default ErrorMessage
