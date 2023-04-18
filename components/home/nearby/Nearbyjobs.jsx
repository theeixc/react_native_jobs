import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'
import useFetch from '../../../hooks/useFetch'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

// 附件工作组件
const Nearbyjobs = () => {
  const router = useRouter();


  const { data, loading, err, fetchData } = useFetch("search", { query: 'React developer', num_pages: 1, page: 1 });


  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all Jobs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : err ? (<Text>Something went wrong</Text>) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs