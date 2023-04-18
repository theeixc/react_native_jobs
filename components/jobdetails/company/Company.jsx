import React from 'react'
import { View, Text, Image } from 'react-native'
import { icons } from '../../../constants';
import { checkImageUrl } from '../../../utils'

import styles from './company.style'


// 默认logo url
const defaultLogoUrl = 'https://cdn.pixabay.com/photo/2016/03/15/09/05/job-1257204_960_720.jpg';

const Company = ({ companyLogo, jobTitle, companyName, jobCountry, jobCity }) => {


  return (
    <View style={styles.container}>
      {/* 公司logo */}
      <View style={styles.logoBox}>
        <Image
          source={{ uri: checkImageUrl(companyLogo) ? companyLogo : defaultLogoUrl }}
          style={styles.logoImage}
          resizeMode='contain'
        />
      </View>

      {/* 职位 */}
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      {/* 地点 */}
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName}</Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          <Text style={styles.locationName} >{jobCountry} {jobCity}</Text>
        </View>
      </View>
    </View >
  )
}

export default Company