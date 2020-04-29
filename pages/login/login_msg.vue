<template>
	<view class="page">
		<view class="password-box">
			<!-- 账号 -->
			<view class="password-v">
				<view class="password-icon obj-center">
					<image src="../../static/login/phone.png" mode=""></image>
				</view>
				<view class="password-inp obj-center">
					<input type="text" name="username" v-model="username" placeholder="请输入手机号..." placeholder-style="color:#ccc;font-weight:100" />
				</view>
				<view class="password-icon obj-center" @click="clearInput('username')">
					<image src="../../static/me/clear.png" mode=""></image>
				</view>
			</view>
			<!-- 验证码 -->
			<view class="password-v no-border mt-60">
				<view class="password-inp yzm-box obj-center">
					<input type="text" name="msg_code" v-model="msg_code" placeholder="请输验证码..." placeholder-style="color:#ccc;font-weight:100" />
				</view>
				<sendMsgCom temp="1" time="10" beforeColor="#2CC17B" afterColor="#c5cddb"></sendMsgCom>
			</view>
			<!-- 确定按钮 -->
			<view class="password-v no-border mt-60">
				<view class="ok-btn" @click="login()">登录</view>
			</view>
			<!-- 登录方式 -->
			<view class="password-v no-border login-way-box  mt-30">
				<view class="login-way show-border-r">
					<navigator url="login" redirect hover-class="other-navigator-hover">
					账号密码登录
					</navigator>
				</view>
				<view class="login-way">
					<navigator url="register" redirect hover-class="other-navigator-hover">
					注册账号
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sendMsgCom from '@/components/send-msg/send-msg.vue'; 
	export default {
		components: {
			sendMsgCom
		},
		data() {
			return {
				title: 'Hello',
				username: '',
				msg_code: '',
				yzmstate: 0,
				yzmhtml:'获取验证码',
				activeColor: '#2CC17B'
				//#2CC17B greyColor:'#c5cddb'
			}
		},
		onLoad() {
			console.log(11111111)
		},
		methods: {
			clearInput(val) { // 清除输入框
				if (val == 'username') {
					this.username = '';
					console.log('清除')
				}
			},
			login() { // 登录操作
				// 打开动画
				uni.showLoading({
					title: '登录中...',
					mask: true
				});
				uni.request({
					url: this.$serverUrl + '/api/login/loginByMsg',
					method: 'POST',
					data: {
						phone_num: this.username,
						msg_code: this.msg_code
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret);
							return;
						}
						if (ret.data.code == 0) {
							// 取数据并赋值
							uni.setStorageSync('userinfo', ret.data.data);
							// 气泡提示
							uni.showToast({
								title: ret.data.message,
								duration: 2000
							});
							// 关闭动画
							uni.hideLoading();
							// 跳转到首页
							uni.reLaunch({
								url: '../index/index'
							});
						} else {
							// 关闭动画
							uni.hideLoading();
							// 气泡提示
							uni.showToast({
								title: ret.data.message,
								icon: 'none',
								duration: 2000
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
	.login-way-box {
		justify-content: flex-start;
	}
	.login-way {
		height: 28upx;
		line-height: 28upx;
		font-size: 24upx;
		color: #999;
		padding: 0upx 30upx;
	}
	.show-border-r {
		border-right: 1px solid #999;
	}
	.yzm-box {
		padding: 0upx 30upx;
		border: 1px solid #c5cddb;
		margin-right: 20upx;
		border-radius: 5upx;

	}
	.yzm-btn-box  {
		width: 250upx;
		border: 1px solid #2CC17B ;
		border-radius: 5upx;
		font-size: 32upx;
		font-weight: normal;
		color: #2CC17B;
	}
</style>
