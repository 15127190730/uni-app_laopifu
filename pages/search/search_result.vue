<template>
	<view class="page">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value, key) in result" :key="key" @click="goDetail(value.vod_id)">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="value.vod_pic"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ value.vod_name }}</view>
						<view class="uni-media-list-text-top">{{ value.vod_blurb }}</view>
						<view class="uni-media-list-text-bottom">
							<text>{{ value.vod_year }}</text>
							<text>{{ value.vod_remarks }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			keyword: '',
			result: []
		};
	},
	onLoad() {
		const userinfo = uni.getStorageSync('userinfo');
		const keyword = uni.getStorageSync('search_keyword');
		if (userinfo) {
			uni.request({
				url: this.$serverUrl + 'index/Search',
				method: 'POST',
				data: { unionid: userinfo.unionid, wd: keyword },
				success: ret => {
					if (ret.data.code == 1) {
						console.log(ret.data.data)
						this.result = ret.data.data;
					} else {
						uni.showToast({
							title: ret.data.msg,
							icon: 'none',
							duration: 1000
						});
					}
				}
			});
		} else {
			// uni.navigateTo({
			// 	url: '../login/login'
			// });
		}
	},
	onReady() {},
	methods: {}
};
</script>

<style scoped>
page {
	background-color: #ffffff !important;
}

.page {
	background-color: #ffffff !important;
	margin-top: var(--status-bar-height);
}
.uni-media-list-logo {
	width: 180upx;
	height: 260upx;
}

.uni-media-list-body {
	height: auto;
	justify-content: space-around;
}

.uni-media-list-text-top {
	height: 74rpx;
	font-size: 28rpx;
	overflow: hidden;
}

.uni-media-list-text-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
