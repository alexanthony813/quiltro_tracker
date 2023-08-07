import React from 'react'
import { Modal, Text, View } from 'react-native'

import * as Yup from 'yup'
import { Form, FormField } from './forms'

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Nombre'),
  price: Yup.string().required().min(1).label('Precio'),
  link: Yup.string().label('Enlace (opcional)'),
})

function NewRequestedItemModal({
  isVisible,
  setIsVisible,
  appendRequestedItem,
}) {
  <Modal visible={isVisible}>
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 16,
        height: '100%',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        Agregar un Quiltro
      </Text>
      <View style={{ paddingTop: 5, paddingBottom: 50 }}>
        <Form
          initialValues={{
            title: '',
            price: '',
            link: '',
          }}
          onSubmit={(requestedItem) => {
            appendRequestedItem(requestedItem)
            setIsVisible(false)
          }}
          validationSchema={validationSchema}
        >
          <FormField
            style={{ width: '100%' }}
            maxLength={255}
            name="title"
            placeholder="Nombre"
          />
          <FormField
            style={{ width: '100%' }}
            maxLength={255}
            name="price"
            placeholder="Precio"
          />
          <FormField
            style={{ width: '100%' }}
            maxLength={255}
            name="link"
            placeholder="Enlace (opcional)"
          />
        </Form>
      </View>
    </View>
  </Modal>
}

export default NewRequestedItemModal
