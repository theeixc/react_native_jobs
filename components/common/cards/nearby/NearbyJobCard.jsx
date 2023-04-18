import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyjobcard.style'

import { checkImageUrl } from '../../../../utils'

// 默认logo url
const defaultLogoUrl = 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg';

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity
        style={styles.logoContainer}
      >

        <Image
          source={{ uri: checkImageUrl(job.employer_logo) ? job.employer_logo : defaultLogoUrl }}
          resizeMode='contain'
          style={styles.logoImage}
        ></Image>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.jobName}>{job.job_title}</Text>
        <Text style={styles.jobType}>{job.employment_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard