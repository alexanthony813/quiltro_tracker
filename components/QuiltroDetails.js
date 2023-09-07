import { View, Text } from 'react-native'
import colors from '../config/colors'

function QuiltroDetails({ quiltro }) {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
        ¡Hola! Me llamo {quiltro.name}
      </Text>
      <Text>{quiltro.description}</Text>
      <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
        <Text style={{ fontWeight: 'bold' }}>{'Prefiero Comer: '}</Text>
        {quiltro.favoriteFoods}
      </Text>
      {quiltro.allergies ? (
        <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
          <Text style={{ fontWeight: 'bold' }}>{'Mis Alergias: '}</Text>
          {quiltro.allergies}
        </Text>
      ) : null}
      <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
        <Text style={{ fontWeight: 'bold', color: 'red' }}>
          {'NO ME DES: '}
        </Text>
        {/* maybe should make this dynamic again, gotten requests to change... */}
        Comida Chatarra, Huesos, Cebollas, Chocolat
      </Text>
    </View>
  )
}

export default QuiltroDetails
