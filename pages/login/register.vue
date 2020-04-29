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
			<!-- 昵称 -->
			<view class="password-v mt-60">
				<view class="password-icon obj-center">
					<image src="../../static/login/nick2.png" mode=""></image>
				</view>
				<view class="password-inp obj-center">
					<input type="text" name="nickname" v-model="nickname" placeholder="请输入昵称..." placeholder-style="color:#ccc;font-weight:100" />
				</view>
				<view class="password-icon obj-center" @click="clearInput('nickname')">
					<image src="../../static/me/clear.png" mode=""></image>
				</view>
			</view>
			<!-- 性别 -->
			<view class="password-v mt-60">
				<view class="password-icon obj-center">
					<image src="../../static/login/sex2.png" mode=""></image>
				</view>
				<view class="password-inp obj-center sex-box">
					<radio-group class="radio-box" @change="radioChange">
						<label v-for="(item, index) in items" :key="item.value">
							<radio :value="item.value" :checked="index === current" />{{item.name}}
						</label>
					</radio-group>
				</view>
				<view class="password-icon obj-center" @click="clearInput('nickname')">
					<!-- <image src="../../static/me/clear.png" mode=""></image> -->
				</view>

			</view>
			<!-- 密码 -->
			<view class="password-v mt-60">
				<view class="password-icon obj-center">
					<image src="../../static/me/lock2.png" mode=""></image>
				</view>
				<view class="password-inp obj-center">
					<input type="password" name="password" v-model="password" placeholder="请输入密码..." placeholder-style="color:#ccc;font-weight:100" />
				</view>
				<view class="password-icon obj-center" @click="clearInput('password')">
					<image src="../../static/me/clear.png" mode=""></image>
				</view>
			</view>
			<!-- 密码2 -->
			<view class="password-v mt-60">
				<view class="password-icon obj-center">
					<image src="../../static/me/lock2.png" mode=""></image>
				</view>
				<view class="password-inp obj-center">
					<input type="password" name="password2" v-model="password2" placeholder="再次输入密码..." placeholder-style="color:#ccc;font-weight:100" />
				</view>
				<view class="password-icon obj-center" @click="clearInput('password2')">
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
			<view class="password-v no-border mt-60" @click="register()">
				<view class="ok-btn">注册</view>
			</view>
			<!-- 登录方式 -->
			<view class="password-v no-border login-way-box  mt-30">
				<view class="login-way show-border-r">
					<navigator url="login" redirect hover-class="other-navigator-hover">
						账号密码登录
					</navigator>
				</view>
				<view class="login-way">
					<navigator url="login_msg" redirect hover-class="other-navigator-hover">
						短信快捷登录
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
				nickname: '',
				password: '',
				password2: '',
				msg_code: '',
				sex: 0,
				yzmstate: 0,
				yzmhtml: '获取验证码',
				activeColor: '#2CC17B',
				items: [{
						'name': '女',
						'value': 0
					},
					{
						'name': '男',
						'value': 1
					}
				],
				current: 0
			}
		},
		onLoad() {
			
		},
		methods: {
			clearInput(val) { //清空输入框
				if (val == 'username') {
					this.username = '';
				}
				if (val == 'nickname') {
					this.nickname = '';
				}
				if (val == 'password') {
					this.password = '';
				}
				if (val == 'password2') {
					this.password2 = '';
				}
			},
			radioChange(evt) { //单选框改变
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value == evt.target.value) {
						this.current = i;
						this.sex = evt.target.value;
						break;
					}
				}
				
			},
			register() {
				// 对比两次密码
				if (this.password != this.password2) {
					// 气泡提示
					uni.showToast({
						title: '两次密码不一致!',
						icon: 'none',
						duration: 2000
					});
					return ;
				}
				// 打开动画
				uni.showLoading({
					title: '注册中...',
					mask: true
				});
				uni.request({
					url: this.$serverUrl + '/api/login/register',
					method: 'POST',
					data: {
						phone_num: this.username,
						password:this.password,
						nickname:this.nickname,
						sex:this.sex,
						msg_code: this.msg_code
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret);
							return;
						}
						if (ret.data.code == 0) {
							// 气泡提示
							uni.showToast({
								title: ret.data.message,
								duration: 2000,
								success() {
									// 关闭动画
									uni.hideLoading();
									// 跳转到首页
									uni.reLaunch({
										url: 'login'
									});
								}
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

	.yzm-btn-box {
		width: 250upx;
		border: 1px solid #2CC17B;
		border-radius: 5upx;
		font-size: 32upx;
		font-weight: normal;
		color: #2CC17B;
	}

	.sex-box {
		padding: 0 100upx;
		justify-content: space-between;
	}
	.radio-box {
		display: flex;
		justify-content: space-between;
	}
</style>
