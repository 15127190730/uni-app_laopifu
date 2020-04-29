<template>
	<view class="page">
		<view class="movie-list-box">
			<!-- 一条历史记录 -->
			<view class="movie-list" v-for="(item,index) in list" :key="index">
				<view class="movie-pic-box">
					<image :src="picUrl+item.face_pic" mode=""></image>
				</view>
				<view class="movie-info-box">
					
					<view class="movie-info-box-n">
						<view class="movie-title">
							{{item.movie_title}}
						</view>
						<view class="movie-time">
							<text>{{item.add_time}}</text>
							<text class="delet-info" @click="delHistory(item.history_id)">删除</text>
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
				list:[],
				picUrl: this.$pictureUrl
			}
		},
		onLoad() {
			this.selHistoryById();
		},
		methods: {
			selHistoryById() { //历史记录
				uni.request({
					url: this.$serverUrl + '/api/history/selHistoryById',
					method: 'POST',
					header:{
						'token':uni.getStorageSync('userinfo').token
					},
					data: {
						member_id: uni.getStorageSync('userinfo').member_id
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret);
							return;
						}
						if (ret.data.code == 0) {
							this.list = ret.data.data.list;
							console.log(this.list)
						} 
						if (ret.data.code == 2) {
							// 气泡提示
							uni.showToast({
								title: '数据异常，请重新登录',
								duration: 2000,
								success() {
									uni.reLaunch({
										url: '../login/login'
									});
								}
							});
							
							
						} 
					}
				});
			},
			delHistory(history_id) { // 触发提示框
				uni.showModal({
					title: '提示',
					content: '确定删除',
					confirmColor:'#FF4400',
					success:(res) => {
						if (res.confirm) {
							// 删除记录
							this.delHistoryDo(history_id);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			delHistoryDo(history_id) { // 删除记录
				uni.request({
					url: this.$serverUrl + '/api/history/delHistory',
					method: 'POST',
					header:{
						'token':uni.getStorageSync('userinfo').token
					},
					data: {
						history_id: history_id
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret);
							return;
						}
						if (ret.data.code == 0) {
							// 刷新
							this.selHistoryById();
						} 
						if (ret.data.code == 2) {
							// 气泡提示
							uni.showToast({
								title: '数据异常，请重新登录',
								duration: 2000,
								success() {
									uni.reLaunch({
										url: '../login/login'
									});
								}
							});
						} 
					}
				});
			}
		}
	}
</script>

<style>
	.movie-list-box {
		padding: 0upx 30upx;
		background-color: #FFFFFF;
	}

	.movie-list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 208upx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #ddd;
	}

	.movie-pic-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 220upx;
		height: 100%;
	}

	.movie-pic-box image {
		width: 220upx;
		height: 140upx;
	}

	.movie-info-box {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0upx 20upx;
	}

	.movie-info-box-n {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 140upx;
		width: 100%;
	}

	.movie-title {
		height: 70%;
		font-size: 32upx;
		color: #333;
		overflow: hidden;
	}

	.movie-time {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 30%;
		font-size: 28upx;
		color: #555;
	}

	.delet-info {
		color: #FF4400;
	}
</style>
