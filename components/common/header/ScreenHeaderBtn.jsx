import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'

// 实现自定义按钮
const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {


  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      >
      </Image>
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn