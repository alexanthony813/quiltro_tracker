import React from 'react'
import { View, Text } from 'react-native'
import colors from '../config/colors'
import { timeSince } from '../utility/helpers'

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
      {quiltro.lastStatusEvent ? (
        <View
          style={{
            marginBottom: '0.25em',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>
            Has visto algo incorrecto? Se informó un problema desde hace
            {` ${timeSince(quiltro.lastStatusEvent.time)}`}
          </Text>
          <Text></Text>
        </View>
      ) : null}
    </View>
  )
}

export default QuiltroDetails
