import React from 'react'
import { FlatList } from 'react-native'
import Card from './Card.js'

const AmigoList = (props) => {
  const { amigos } = props

  return (
    <FlatList
      data={amigos}
      horizontal={true}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item, index }) => {
        if (item && item.name) {
          const imageLoadPriority = index < 2 ? 'high' : 'low'
          return <Card showAllDetails={false} imageLoadPriority={imageLoadPriority} item={item} />
        }
      }}
    />
  )
}

export default AmigoList
