import { View, TouchableOpacity, Image } from 'react-native'

const BackButton = ({ onPress }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 0,
      }}
    >
      <TouchableOpacity
        aria-label="back-button"
        role="button"
        tabindex="0"
        style={{
          opacity: 1,
          alignItems: 'center',
          flexDirection: 'row',
          minWidth: 1,
        }}
        onPress={onPress}
      >
        <View
          style={{
            height: 24,
            width: 24,
            margin: 3,
            transform: [{ scaleX: 1 }],
          }}
        >
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAAAlklEQVR4Ae3a1REDMRDG4A3VmHbcUFLigf0exn/mkxuQjmELAAAAAD5Eq5atP6+rZeuPhGz9kZCtPxKy9fs6Zuuf60CfPn369OnTp0+fPn369OnTfx36X1vh+nO6/pytL+D1BCexy+iNhFPt6/dIOEiQIEGCBAkSJEiQ8B0k+PwoQYKhP2OXAYOvRo+vD38bvwcAAACABXF8ILs1PQqpAAAAAElFTkSuQmCC',
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default BackButton
