import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './popularjobcard.style'

import { checkImageUrl } from '../../../../utils'

// 默认logo url
const defaultLogoUrl = 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg';

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity
        style={styles.logoContainer(selectedJob, item)}
      >
        {/* 公司的 logo */}
        <Image
          source={{ uri: checkImageUrl(item.employer_logo) ? item.employer_logo : defaultLogoUrl }}
          resizeMode='contain'
          style={styles.logoImage}
        ></Image>
      </TouchableOpacity>
      {/* 公司名称 */}
      <Text style={styles.companyName} numberOfLines={1}>{item.employer_name}</Text>
      {/* 职位信息 */}
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.jobName(selectedJob, item)}>{item.job_title}</Text>
        <Text style={styles.location}>{item.job_country}{`${item.job_city ? `,${item.job_city}` : ''}`}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard