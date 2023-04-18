import { useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { COLORS, icons, images, SIZES } from '../constants'

import { useRouter, Stack } from 'expo-router'

import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components'
import { ScrollView } from 'react-native-gesture-handler'

// 主页
const Home = () => {

  const router = useRouter();

  // 搜索关键字
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite
          },
          headerShadowVisible: false,
          headerLeft: () => {
            return <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          },
          headerRight: () => {
            return <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          },
          headerTitle: ''
        }}
      />

      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{ flex: 1, padding: SIZES.medium }}
        >
          <Welcome searchText={searchText} setSearchText={setSearchText} handleClick={() => {
            if (searchText) {
              router.push(`/search/${searchText}`)
            }
          }} />
          <Popularjobs></Popularjobs>
          <Nearbyjobs></Nearbyjobs>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home