import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Pressable } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants'

const jobTabs = ['Full-time', 'Part-time', 'Liaison']

// 欢迎页
const Welcome = ({ searchText, setSearchText, handleClick }) => {
  const router = useRouter()

  // 处于激活状态的工作类型
  const [activeJobType, setActiveJobType] = useState("Full-time");


  return (
    <View style={styles.container}>
      {/* 欢迎词 */}
      <Text style={styles.userName}>Hello Theei</Text>
      <Text style={styles.welcomeMessage}>Find your Jobs</Text>

      {/* 搜索区 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder='What are you looking for ?'
          />
        </View>

        {/* 搜索按钮 */}
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      {/* 展示 tabs */}
      <View style={styles.tabsContainer} >
        <FlatList
          data={jobTabs}
          // 每个渲染项都是 Touchable
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }} >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />

      </View>
    </View>
  )
}

export default Welcome