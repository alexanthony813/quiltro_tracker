import React from 'react'
import { View, Text } from 'react-native'
import colors from '../config/colors'

function QuiltroDetails({ quiltro }) {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
        Hola! Me llamo {quiltro.name}
      </Text>
      <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
        <Text style={{ fontWeight: 'bold' }}>{'Prefiero comer: '}</Text>
        {quiltro.favoriteFoods}
      </Text>
      {/* {quiltro.allergies ? (
        <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
          <Text style={{ fontWeight: 'bold' }}>{'Alergias: '}</Text>
          {quiltro.allergies}
        </Text>
      ) : null} */}
      <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
        <Text style={{ fontWeight: 'bold', color: 'red' }}>
          {'No me des: '}
        </Text>
        cebollas, nueces, chocolat, lecheo, palta
      </Text>
      <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
        <Text style={{ fontWeight: 'bold' }}>{'Vivo en: '}</Text>
        {quiltro.location}
      </Text>
    </View>
  )
}

export default QuiltroDetails
