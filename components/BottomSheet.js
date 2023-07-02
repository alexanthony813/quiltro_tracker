import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  EasingNode,
} from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

const BottomSheet = ({ bottomSheetContentMode }) => {
  const context = useSharedValue({ y: 0 })
  const translateY = useSharedValue(0)
  const active = useSharedValue(false)

  const scrollTo = useCallback((destination) => {
    'worklet'
    active.value = destination !== 0

    translateY.value = withSpring(destination, { damping: 50 })
  }, [])

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

  const fadeAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const easing = EasingNode.ease
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: true, // Enable native driver for better performance
      easing,
    }).start()
  }, [])

  const rBottomSheetStyle = {
    opacity: fadeAnimation,
    transform: [
      {
        translateY: fadeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0], // Adjust the translation as needed
        }),
      },
    ],
  }
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
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
