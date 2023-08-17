import React from 'react'
import { Modal, Text, View } from 'react-native'

import * as Yup from 'yup'
import { Form, FormField, SubmitButton } from './forms'

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Nombre'),
  price: Yup.string().required().min(1).label('Precio'),
  link: Yup.string().label('Enlace (opcional)'),
})

function NewRequestedItemModal({
  isModalVisible,
  setIsModalVisible,
  appendRequestedItem,
}) {
  return (
    <Modal visible={isModalVisible}>
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
              setIsModalVisible(false)
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
            <SubmitButton
              styles={{
                marginBottom: '0.5em',
                borderRadius: '10%',
                width: '30%',
              }}
              className="py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
              title="Guardar"
            />
          </Form>
        </View>
      </View>
    </Modal>
  )
}

export default NewRequestedItemModal
