<template>
	<view class="page">
		<view class="user-info" @click="isLogin()">
			<image class="user-pic" :src="head"></image>
			<view class="user-name">{{ nickname }}</view>
		</view>
		<view class="user-link">
			<view class="link-box" @click="toHistory()">
				<view class="link-title">历史记录</view>
				<!-- <image class="link-icon" src="../../static/me/jian-r.png"></image> -->
			</view>
			<view class="link-box no-border" @click="toFeedback()">
				<view class="link-title">问题反馈</view>
				<!-- <image class="link-icon" src="../../static/me/jian-r.png"></image> -->
			</view>
		</view>
		<view class="out-login"><button class="out-login-btn" type="default" @click="outLogin()">退出登录</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			nickname: '登陆/注册',
			head: '../../static/head.png'
		};
	},
	onLoad() {
		// 页面加载完成
		this.isLogin()
	},
	methods: {
		toHistory() {
			//历史记录
			uni.navigateTo({
				url: 'history'
			});
		},
		toFeedback() {
			//问题反馈
			uni.navigateTo({
				url: 'feedback'
			});
		},
		isLogin() {
			//判断登录状态
			const userinfo = uni.getStorageSync('userinfo');
			console.log(userinfo)
			if (userinfo) {
				this.nickname = userinfo.nickname;
				this.head = userinfo.headimg;
			} else {
				const datas = { unionid: 'UID_052C6B31E965E886595A15597E771474', headimg: 'http://thirdqq.qlogo.cn/g?b=oidb&k=V0HoLJnbibsaj26rHcDOHdw&s=640&t=1572407279' ,'nickname':'神級描述師'};
				uni.setStorageSync('userinfo', datas);
				// this.qqlogin();
			}
		},
		outLogin() {
			//退出登录
			uni.showModal({
				title: '提示',
				content: '确定退出登录',
				confirmColor: '#FF4400',
				success: function(res) {
					if (res.confirm) {
						// 清除账号缓存
						uni.removeStorageSync('userinfo');
						// 跳转到首页
						uni.reLaunch({
							url: '../index/index'
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		qqlogin() {
			var _that = this;
			uni.login({
				provider: 'qq',
				success: function(loginRes) {
					uni.getUserInfo({
						provider: 'qq',
						success: function(infoRes) {
							if (infoRes.userInfo) {
								console.log(infoRes.userInfo)
								_that.nickname = infoRes.nickname;
								_that.head = infoRes.headimg;
								_that.getQQUnionid(loginRes.authResult, infoRes.userInfo);
							} else {
								uni.showToast({
									title: '获取登录信息失败',
									icon: 'none',
									duration: 1000
								});
							}
						}
					});
				}
			});
		},
		getQQUnionid(res, info) {
			uni.request({
				url: this.$serverUrl + 'login',
				method: 'POST',
				data: { openid: res.openid, access_token: res.access_token, nickname: info.nickname, headimg: info.figureurl_qq },
				success: ret => {
					if (ret.data.code == 1) {
						uni.setStorageSync('userinfo', ret.data.data);
					} else {
						uni.showToast({
							title: '登录失败',
							icon: 'none',
							duration: 1000
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.user-info {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 156upx;
	background-color: #ffffff;
	padding: 0upx 30upx;
}

.user-pic {
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
}

.user-name {
	margin-left: 30upx;
	font-size: 32upx;
}

.user-link {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #ffffff;
	padding: 0upx 30upx;
}

.link-box {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100upx;
	border-bottom: 1px solid #ddd;
}

.link-title {
	font-size: 28upx;
	color: #333;
}

.link-icon {
	width: 40upx;
	height: 40upx;
}

.out-login {
	margin-top: 180upx;
}

.out-login-btn {
	width: 80%;
	border-radius: 3px;
	color: #ff4400 !important;
	font-size: 32upx;
}

.out-login-btn:after {
	border: 1px solid #ff4400;
}

.button-hover {
	background-color: #f7f7f7 !important;
}
</style>
