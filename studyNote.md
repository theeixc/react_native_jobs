# RN项目：React Native + Expo + Expo-router

Expo 类似于 create-react-app，便于开发

Expo-router 在移动端实现路由导航



## 初始化项目

- `npx create-expo-app@latest --example with-router` 创建项目
  - 可能会出错，可直接到[github仓库](https://github.com/expo/examples/tree/master/with-router)中下载对应模板
- 在根目录下创建 app 文件加（Expo-rouer要求）
  - index.js 应用首页
  - _layout.js 布局路由。具体文件内容见[Expo router](https://expo.github.io/router/docs/guides/)
- 下载expo方便开发，同时手机端下载 Expo go。让应用运行在移动端(**保证主机和手机连同个Wi-Fi**)



## 开发流程

主要分为以下组件：`Welcome`、`Popularjobs`、`Nearbyjobs`以及`JobDetails`组件

常用的RN基础组件有：`SafeAreaView`、`Stack.Screen`、`View`、`Text`、`Image`、`TouchableOpacity`、`FlatList`等

使用到的接口由`RapidAPI`提供，接口在[主页](https://rapidapi.com/hub)中搜索`JSearch`

- **重要**：
  - 路由跳转相关：工作详情`JobDetails`以及搜索结果展示页`Search`需要经过路由跳转
  - `router.push('/job-details/${job_id}')`，需要`app`文件夹下新建`job-details`文件夹，同时在``job-details`文件夹下新建`[id].js`文件。这样路由才能找到对应的组件。

