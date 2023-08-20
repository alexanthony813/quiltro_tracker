import { Dimensions, Text, View } from 'react-native'
import { useCallback, useEffect, useRef } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  withSpring,
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
      // useNativeDriver: true, // TODO revisit when have time to solve  `useNativeDriver` is not supported because the native animated module is missing.
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
      <Animated.View
        style={[
          {
            height: SCREEN_HEIGHT,
            width: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            top: SCREEN_HEIGHT / 1.5,
            borderRadius: 25,
          },
          rBottomSheetStyle,
        ]}
      >
        <View
          style={{
            width: 75,
            height: 4,
            backgroundColor: 'grey',
            alignSelf: 'center',
            marginVertical: 15,
            borderRadius: 2,
          }}
        />
        {bottomSheetContentMode && bottomSheetContentMode === 'filters' && (
          <View>
            <Text>Filters</Text>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  )
}

export default BottomSheet
