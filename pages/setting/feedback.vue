<template>
	<view class="page">
		<view class="feedback-box">
			<textarea class="feedback-tar" v-model="content" placeholder="请输入您的问题..." />
		</view>
		<!-- 确定按钮 -->
		<view class="feedback-box">
			<view class="password-v no-border mt-60">
				<view class="ok-btn" @click="addFeedback()">提交反馈</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			}
		},
		onLoad() {
			
		},
		methods: {
			addFeedback() { // 反馈信息
				// 打开动画
				uni.showLoading({
					title: '提交中...',
					mask: true
				});
				uni.request({
					url: this.$serverUrl + '/api/feedback/addFeedback',
					method: 'POST',
					header:{
						'token':uni.getStorageSync('userinfo').token
					},
					data: {
						content: this.content,
						member_id:uni.getStorageSync('userinfo').member_id
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret);
							return;
						}
						if (ret.data.code == 0) {
							// 关闭动画
							uni.hideLoading();
							uni.showToast({
								title: ret.data.message,
								duration: 2000,
								success:()=> {
									this.content = ''
								}
							});
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
	body , .feedback-box{
		background-color: #FFFFFF;
	}
	.feedback-box {
		display: flex;
		flex-direction: row;
		padding: 0 30upx;
	}
	.feedback-tar {
		flex: 1;
		background-color: #f7f7f7;
		font-size: 28upx;
		color: #333;
		padding: 30upx;
		border-radius: 10upx;
	}
	.password-v {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		height: 88upx;
		border: 1px solid #c5cddb;
		border-radius: 5upx;
	}
	.ok-btn {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		color: #FFF;
		background-color: #2CC17B !important;
		border-radius: 10upx;
	}
</style>
