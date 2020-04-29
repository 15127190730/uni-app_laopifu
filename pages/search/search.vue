<template>
	<view><zy-search :is-focus="true" :theme="themeClass" :show-want="true" :speechEngine="speechEngine" :hot-list="hotList" @getSearchText="getSearchText"></zy-search></view>
</template>

<script>
import zySearch from '@/components/zy-search/zy-search.vue';
export default {
	components: {
		zySearch
	},
	data() {
		return {
			themeClass: 'circle',
			speechEngine: 'baidu', //语音识别引擎
			hotList: ['栏目1', '栏目2', '栏目3', '栏目4'] //初始化推荐列表
		};
	},
	methods: {
		getSearchText(e) {
			uni.setStorageSync('search_keyword', e);
			uni.navigateTo({
				url: 'search_result'
			});
		}
	}
};
</script>

<style>
body {
	background-color: #ffffff;
}
</style>
