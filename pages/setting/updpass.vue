<template>
	<view class="page">
		<view class="password-box">
			<!-- 旧密码 -->
			<view class="password-v">
				<view class="password-icon obj-center">
					<image src="../../static/me/lock2.png" mode=""></image>
				</view>
				<view class="password-inp obj-center">
					<input type="password" name="oldPwd" v-model="oldPwd" placeholder="请输入旧密码..." placeholder-style="color:#ccc;font-weight:100" />
				</view>
				<view class="password-icon obj-center" @click="clearInput('oldPwd')">
					<image src="../../static/me/clear.png" mode=""></image>
				</view>
			</view>
			<!-- 新密码 -->
			<view class="password-v mt-60">
				<view class="password-icon obj-center">
					<image src="../../static/me/lock2.png" mode=""></image>
				</view>
				<view class="password-inp obj-center">
					<input type="password" name="newPwd" v-model="newPwd" placeholder="请输入新密码..." placeholder-style="color:#ccc;font-weight:100" />
				</view>
				<view class="password-icon obj-center" @click="clearInput('newPwd')">
					<image src="../../static/me/clear.png" mode=""></image>
				</view>
			</view>
			<!-- 新密码2 -->
			<view class="password-v mt-60">
				<view class="password-icon obj-center">
					<image src="../../static/me/lock2.png" mode=""></image>
				</view>
				<view class="password-inp obj-center">
					<input type="password" name="newPwd2" v-model="newPwd2"  placeholder="再次输入新密码..." placeholder-style="color:#ccc;font-weight:100" />
				</view>
				<view class="password-icon obj-center" @click="clearInput('newPwd2')">
					<image src="../../static/me/clear.png" mode=""></image>
				</view>
			</view>
			<!-- 确定按钮 -->
			<view class="password-v no-border mt-60">
				<view class="ok-btn" @click="updPwdByPwd()">确定修改</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				oldPwd: '',
				newPwd: '',
				newPwd2: ''
			}
		},
		onLoad() {
	
		},
		methods: {
			clearInput(val) { //清除密码
				if (val == 'oldPwd') {
					this.oldPwd = '';
					console.log('清除旧密码')
				}
				if (val == 'newPwd') {
					this.newPwd = '';
					console.log('清除新密码')
				}
				if (val == 'newPwd2') {
					this.newPwd2 = '';
					console.log('清除新密码2')
				}
			},
			updPwdByPwd() { // 修改密码
				// 对比两次密码
				if (this.newPwd != this.newPwd2) {
					uni.showToast({
						title: '两次密码不一致',
						duration: 2000,
						icon:'none'
					});
					return ;
				}
				// 打开动画
				uni.showLoading({
					title: '提交中...',
					mask: true
				});
				uni.request({
					url: this.$serverUrl + '/api/member/updPwdByPwd',
					method: 'POST',
					header:{
						'token':uni.getStorageSync('userinfo').token
					},
					data: {
						oldPassword:this.oldPwd,
						newPassword:this.newPwd,
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
								duration: 2000
							});
						} 
						if (ret.data.code == 1) {
							// 关闭动画
							uni.hideLoading();
							uni.showToast({
								title: ret.data.message,
								duration: 2000,
								icon:'none'
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
	body {
		background-color: #FFFFFF;
	}
	.password-box {
		padding: 0upx 30upx;
		background-color: #FFFFFF;
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
	.password-inp {
		flex: 1;
	}
	.password-inp input {
		width: 100%;
		font-size: 32upx;
		color: #333;
		font-weight: bold;
	}
	.password-icon {
		width: 72upx;
		line-height: 88upx;
		padding: 0 14upx;
		color: #8a8a8a;
		font-size: 40upx;
		font-weight: bold;
	}
	.obj-center {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.password-icon image {
		width: 40upx;
		height: 40upx;
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
