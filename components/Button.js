import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

// rename flex button? better TODO for passing styles to these generic components
function AppButton({ title, onPress, color = 'primary' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 10,
    flex: 1,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})

export default AppButton

const handleSubmit = async (listing, { resetForm }) => {
  setProgress(0)
  setUploadVisible(true)
  const result = await listingsApi.addListing(
    { ...listing, location },
    (progress) => setProgress(progress)
  )

  if (!result.ok) {
    setUploadVisible(false)
    return alert('Could not save the listing')
  }

  resetForm()
}
