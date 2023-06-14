import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useImperativeHandle } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const BottomSheet = ({ bottomSheetContentMode }) => {
  const context = useSharedValue({ y: 0 })
  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0)
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y)
      }
    })
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[styles.bottomSheetContainer, styles.rBottomSheetStyle]}
      >
        <View style={styles.line} />
        {bottomSheetContentMode && bottomSheetContentMode === 'map' && (
          <View>
            <Text>Map</Text>
          </View>
        )}
        {bottomSheetContentMode && bottomSheetContentMode === 'filters' && (
          <View>
            <Text>Filters</Text>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  )
}
const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.5,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
})

// )
export default BottomSheet
