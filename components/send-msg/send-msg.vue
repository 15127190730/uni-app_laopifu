<template>
	<view class="">
		<view class="password-icon yzm-btn-box obj-center" :style="{color: activeColor,borderColor:activeColor}" @click="sendMsg()" v-html="yzmhtml"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yzmstate: 0,
				yzmhtml:'获取验证码',
				activeColor: this.beforeColor
				//#2CC17B greyColor:'#c5cddb'
			}
		},
		onLoad() {
			
		},
		created() {
			
		},
		props:{
			time:Number,
			beforeColor:String,
			afterColor:String,
			temp:Number
		},
		methods: {
			sendMsg() {
				let t = this.time;
				if (this.yzmstate == 0) {
					this.yzmstate = 1;
					this.activeColor = this.afterColor;
					this.yzmhtml = t + 'S后重发';
					this.sendDo();//发送
					let inter = setInterval(() => {
						t--;
						this.yzmhtml = t + 'S后重发';
						if (t == 0) {
							clearInterval(inter);
							this.yzmstate = 0;
							this.yzmhtml = '获取验证码';
							this.activeColor = this.beforeColor;
						}
					}, 1000);
				}
				
			},
			sendDo() {
				uni.request({
					url: this.$serverUrl + '/api/login/sendMsg',
					method: 'POST',
					data: {
						phone_num: this.$parent.username
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
								icon:'none',
								duration: 2000
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

<style scoped>
	.password-icon {
		width: 72upx;
		line-height: 88upx;
		padding: 0 14upx;
		color: #8a8a8a;
		font-size: 40upx;
		font-weight: bold;
	}
	.yzm-btn-box  {
		width: 250upx;
		border: 1px solid #2CC17B ;
		border-radius: 5upx;
		font-size: 32upx;
		font-weight: normal;
		color: #2CC17B;
	}
	.obj-center {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
