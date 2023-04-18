import { useCallback, useState } from 'react'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { ActivityIndicator, RefreshControl, SafeAreaView, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hooks/useFetch';
import { Company, JobAbout, JobFooter, JobTabs, Specifics } from '../../components';


const tabs = ['About', 'Qualifications', 'Responsibilities'];
/*
  动态路由
    router.push(`/job-details/${job_id}`)
    需要在 app 文件夹下新建 job-details 文件夹，且新建js文件： [id].js
    这样，点击后路由才会找到此文件
*/

// 工作详情组件
const JobDetails = () => {

  const params = useSearchParams();
  const router = useRouter();

  // 刷新
  const [refreshing, setRefreshing] = useState(false);

  // 防止 No Data 出现
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, [])

  // 获取工作详情
  const { data, loading, err, fetchData } = useFetch('job-details', { job_id: params.id });

  // 激活的tab
  const [activeTab, setActiveTab] = useState("About");


  const displayTabContent = () => {
    switch (activeTab) {
      case 'About':
        return <JobAbout info={data[0].job_description ?? 'No Data Provided'} />
      case 'Qualifications':
        return <Specifics title='Qualifications' points={data[0].job_highlights?.Qualifications ?? ['N/A']} />
      case 'Responsibilities':
        return <Specifics title='Responsibilities' points={data[0].job_highlights?.Responsibilities ?? ['N/A']} />
      default:
        break;
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
    >
      {/* 顶部导航栏 */}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => router.back()} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: ''
        }}
      ></Stack.Screen>

      {/* 详情展示区 */}
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {loading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : err ? (
            <Text>Something went wrong !</Text>
          ) : data.length === 0 ? (
            <Text>No Data !</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              {/* 展示公司信息 */}
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                jobCountry={data[0].job_country}
                jobCity={data[0].job_city}
              />
              {/* 展示工作信息标签 */}
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* 展示标签下详情 */}
              {displayTabContent()}

            </View>
          )}
        </ScrollView>

        {/* 底部链接 */}
        <JobFooter url={data[0]?.job_google_link ?? 'https://www.nowcoder.com/jobs/recommend/campus'} />
      </>

    </SafeAreaView >
  )
}

export default JobDetails