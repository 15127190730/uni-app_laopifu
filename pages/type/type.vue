<template>
	<view>
		<sl-filter :ref="'slFilter'" :themeColor="themeColor" :menuList="menuList" @result="result"></sl-filter>
		<view class="panel-box mt-20">
			<view class="panel-main">
				<view v-for="(item, index) in movieList" :key="index" class="panel-pic-text" @click="toDetails(item.vod_id)">
					<view class="panel-pic-body"><image class="panel-pic" :src="item.vod_pic"></image></view>
					<view class="panel-text">{{ item.vod_name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
export default {
	data() {
		return {
			movieList: [],
			type_id: '1',
			page: 1,
			listRows: 20,
			totalPage: 1,
			themeColor: '#000000',
			filterResult: '',
			menuList: this.$Basetype
		};
	},
	components: {
		slFilter
	},

	onLoad() {
		this.getMovie(this.type_id, this.page);
	},
	onPullDownRefresh() {
		this.getMovie(this.type_id, this.page);
	},
	onReachBottom() {
		// 页面触底事件
		console.log('触底了');
		console.log('当前page：' + this.page);
		this.page = this.page + 1;
		this.getMovie(this.type_id, this.page);
	},
	methods: {
		toSearchDo() {
			// 打开搜索页
			uni.navigateTo({
				url: 'search_do',
				animationType: 'slide-in-bottom',
				animationDuration: 200
			});
		},
		toDetails(movie_id, score) {
			// 跳转详情
			uni.navigateTo({
				url: '../details/details?movie_id=' + movie_id + '&score=' + score
			});
		},
		getMovie(type_id, page) {
			// 搜索数据
			uni.request({
				url: this.$serverUrl + 'type/getVideo',
				method: 'POST',
				data: { type: type_id, page: page },
				success: ret => {
					if (ret.data.code == 1) {
						// 取数据并赋值
						this.movieList = this.movieList.concat(ret.data.data);
					} else {
						console.log('未取得数据');
					}
					uni.stopPullDownRefresh();
				}
			});
		},
		getTypeMovie(type_id, page) {
			// 搜索数据
			uni.request({
				url: this.$serverUrl + 'type/getVideo',
				method: 'POST',
				data: { type: type_id, page: page },
				success: ret => {
					if (ret.data.code == 1) {
						// 取数据并赋值
						this.movieList = ret.data.data;
					} else {
						console.log('未取得数据');
					}
					uni.stopPullDownRefresh();
				}
			});
		},
		listenKeyword() {
			// 关键字监听
			let me = this;
			let search_keyword = '';
			let k = setInterval(() => {
				search_keyword = uni.getStorageSync('search_keyword');
				this.movie_title = search_keyword;
				if (uni.getStorageSync('search_flag')) {
					uni.setStorageSync('search_flag', false);
					this.movieList = [];
					this.page = 1;
					this.searchData(this.movie_title, this.page, this.listRows);
				}
			}, 500);
		},
		result(val) {
			this.type_id = val.type_id;
			this.getTypeMovie(val.type_id, 1);
			// this.filterResult = JSON.stringify(val, null, 2);
		}
	}
};
</script>

<style>
/**图文面板**/
.panel-box {
	background-color: #ffffff;
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
	width: 33.33333333%;
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
