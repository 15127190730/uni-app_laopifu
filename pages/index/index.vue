<template>
	<view class="page">
		<!-- 轮播图 -->
		<!-- <swiper class="lunbo-box" indicator-active-color="#FFFFFF" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(list,index) in lunboList" :key="index">
				<image class="lunbo-box" :src="picUrl+list.pic_path" mode=""></image>
			</swiper-item>
			
		</swiper> -->
		<!-- 热门强推 -->
		<view class="panel-box mt-20">
			<view class="panel-title">
				<view class="panel-title-l iconfont icon-dianying">电影</view>
				<view class="panel-title-r"></view>
			</view>
			<view class="panel-main">
				<view v-for="(item,index) in movie" :key="index" class="panel-pic-text" @click="toDetails(item.vod_id)">
					<view class="panel-pic-body">
						<image class="panel-pic" :src="item.vod_pic"></image>
					</view>
					<view class="panel-text">
						{{item.vod_name}}
					</view>
				</view>

			</view>
		</view>
		<!-- 科幻电影 -->
		<view class="panel-box mt-20">
			<view class="panel-title">
				<view class="panel-title-l iconfont icon-tv">电视剧</view>
			</view>
			<view class="panel-main">
				<view v-for="(item,index) in tv" :key="index" class="panel-pic-text" @click="toDetails(item.vod_id)">
					<view class="panel-pic-body">
						<image class="panel-pic" :src="item.vod_pic"></image>
					</view>
					<view class="panel-text">
						{{item.vod_name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 动作电影 -->
		<view class="panel-box mt-20">
			<view class="panel-title">
				<view class="panel-title-l iconfont icon-zongyi">综艺</view>
			</view>
			<view class="panel-main">
				<view v-for="(item,index) in zongyi" :key="index" class="panel-pic-text" @click="toDetails(item.vod_id)">
					<view class="panel-pic-body">
						<image class="panel-pic" :src="item.vod_pic"></image>
					</view>
					<view class="panel-text">
						{{item.vod_name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 动漫 -->
		<view class="panel-box mt-20">
			<view class="panel-title">
				<view class="panel-title-l iconfont icon-dongman">动漫</view>
			</view>
			<view class="panel-main">
				<view v-for="(item,index) in dongman" :key="index" class="panel-pic-text" @click="toDetails(item.vod_id)">
					<view class="panel-pic-body">
						<image class="panel-pic" :src="item.vod_pic"></image>
					</view>
					<view class="panel-text">
						{{item.vod_name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 补底部导航栏距离 -->
		<!-- <view class="full-tabbar"></view> -->
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				title: 'Hello',
				// lunboList: [],
				movie: this.$nullMovie,
				tv: this.$nullMovie,
				zongyi: this.$nullMovie,
				dongman: this.$nullMovie,
				type_name_ch1: [],
				type_name_ch2: [],
				type_name_ch3: [],
				picUrl: this.$pictureUrl,
				statusBarHeight: 0,
				keyword: '',
				movie_title: '',
			}
		},
		onLoad() {
			// 取轮播图数据
			// this.selectLunbo();
			// 按类型取电影
			this.selectTypeMovie(1);
			this.selectTypeMovie(2);
			this.selectTypeMovie(3);
			this.selectTypeMovie(4);
		},
		onPullDownRefresh() {
			console.log('下拉刷新')
			// 按类型取电影
			this.selectTypeMovie(1);
			this.selectTypeMovie(2);
			this.selectTypeMovie(3);
			this.selectTypeMovie(4);
		},
		onNavigationBarButtonTap() {
			console.log("你点击了按钮")
		},
		onNavigationBarSearchInputConfirmed() {
			console.log("搜什么搜")
		},
		onNavigationBarSearchInputClicked() {
			console.log("点击了")
			uni.navigateTo({
				url: '../search/search',
				animationType: 'slide-in-bottom',
				animationDuration: 200
			});
		},
		methods: {
			transform() { // 换一换
				console.log('换一换')
			},
			toDetails(movie_id, score) { // 跳转详情
				uni.navigateTo({
					url: '../details/details?movie_id=' + movie_id + '&score=' + score
				});
			},
			selectTypeMovie(type) { // 电影
				uni.request({
					url: this.$serverUrl + 'Collect/index',
					data: {
						type: type
					},
					success: (ret) => {
						if (ret.data.code == 1) {
							if (type == 1) {
								this.movie = ret.data.data
							} else if (type == 2) {
								this.tv = ret.data.data
							} else if (type == 3) {
								this.zongyi = ret.data.data
							} else if (type == 4) {
								this.dongman = ret.data.data
							}

						}
						uni.stopPullDownRefresh();
					}
				});
			}
		}
	}
</script>

<style>
	/**搜索框**/
	/* #ifdef H5 */
	.search-box {
		position: fixed;
		top: 44px;
		left: 0px;
		z-index: 99;
		width: 92%;
		background-color: #FFFFFF;
		padding: 10upx 30upx 20upx 30upx;
	}

	/* #endif */
	/* #ifdef APP-PLUS */
	.search-box {
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 99;
		width: 92%;
		background-color: #FFFFFF;
		padding: 10upx 30upx 20upx 30upx;
	}

	/* #endif */

	/**轮播图**/
	.lunbo-box {
		width: 100%;
		height: 346upx;
	}

	/**图文面板**/
	.panel-box {
		background-color: #FFFFFF;
		padding: 0upx 30upx;
	}

	.panel-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 68upx;
		font-size: 34upx;
		font-weight: bold;
		color: #3c4a55;
	}

	.panel-main {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.panel-pic-text {
		display: flex;
		flex-direction: column;
		margin: 10upx 0upx;
		width: 33.33333333%
	}

	.panel-pic-body {
		height: 350upx;
		margin: 1upx 5upx;
		background-image: url(../../static/loading.gif);
		background-size: 100%;
	}

	.panel-pic {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}

	.panel-text {
		font-size: 24upx;
		line-height: 44upx;
		color: #3c4a55;
		margin: 10upx 0upx;
		text-align: center;
	}

	.panel-zt-pic {
		width: 100%;
		height: 272upx;
		margin-bottom: 10upx;
	}

	.panel-title-l {
		font-size: 34upx;
		font-weight: normal;
	}

	.panel-title-r {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 28upx;
		color: #007aff;
	}
</style>
