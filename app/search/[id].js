import { useEffect, useState } from 'react'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Text, View, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { NearbyJobCard, ScreenHeaderBtn } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import axios from 'axios'

import styles from '../../styles/search'

// obtain you PapidApiKey in https://rapidapi.com/hub
const PapidApiKey = '';


// 搜索组件
const Search = () => {

  const router = useRouter();
  // 有两种方式跳转，1是点击搜索区右边的按钮。2时点击搜索区下方的 tab
  const params = useSearchParams();
  // 搜索结果数组
  const [searchResult, setSearchResult] = useState([]);
  // 是否加载
  const [searchLoader, setSearchLoader] = useState(false);
  // 出现错误
  const [searchError, setSearchError] = useState(null);
  // 页码
  const [page, setPage] = useState(1);

  // 处理搜索的回调
  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([])

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key": PapidApiKey,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: params.id,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };


  // 设置页码
  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1)
      handleSearch()
    } else if (direction === 'right') {
      setPage(page + 1)
      handleSearch()
    }
  }

  useEffect(() => {
    handleSearch();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* 顶部导航栏 */}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => router.back()} />
          ),
          headerTitle: ''
        }}
      />


      <FlatList
        data={searchResult}
        // 展示区每一项都是一个  NearbyJobCard 组件
        renderItem={({ item }) => (
          <NearbyJobCard job={item} handleNavigate={() => router.push(`/job-details/${item.job_id}`)} />
        )}
        keyExtractor={item => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              {/* 展示搜索的关键字 */}
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : searchError && (
                <Text>Oops!, Something went wrong!</Text>
              )}
            </View>
          </>
        )}
        // 底部为两个按钮，控制页码
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image source={icons.chevronLeft} style={styles.paginationImage} resizeMode='contain' />
            </TouchableOpacity>

            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>

            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}
            >
              <Image source={icons.chevronRight} style={styles.paginationImage} resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Search