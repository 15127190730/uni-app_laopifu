<template>
	<view class="page">
		<!-- 视频播放器 -->
		<view class="video-box">
			<video id="myVideo" :src="movie.movie_path" autoplay="true"
			  enable-danmu  controls :poster="picUrl+movie.face_pic"></video>
		</view>
		<!-- 切换条 -->
		<view class="video-tabbar">
			<view v-for="(list,index) in tarList" :key="index" class="tabbar-text" :class="{activeText:change == index}" @click="changeTab(index)">
				{{list.text}}
			</view>
		</view>
		<!-- 切换内容区 -->
		<view class="tabbar-main" :style="{height:tbH}">
			<!-- 简介区域 -->
			<view class="tabbar-main-text" v-if="change == 0">
				<!-- 标题 -->
				<view class="movie-title">
					<view class="title-text">
						{{movie.movie_title}}
					</view>
					<view class="movie-score">
						<view>        
							<uni-rate :size="18" :value="num" :disabled="true"  active-color="#2CC17B" />
						</view>
						<view class="rennum">
							<text>{{movie.score}}分</text>
							<text>{{movie.browse_num}}人观看</text>
						</view>
						<view class="collect">
							<text :class="{ 'no-collect': noCollect, 'yes-collect': yesCollect }"  @click="addCollect(movie.movie_id)">{{collect_text}}</text>
						</view>
					</view>
				</view>
				<!-- 简介 -->
				<view class="intro mt-20">
					<view class="title-text intro-title mt-20">
						影片介绍
					</view>
					<view class="intro-main">
						<rich-text :nodes="movie.intro"></rich-text>
					</view>
				</view>
			</view>
			<!-- 评价区域 -->
			<view class="tabbar-main-text" v-if="change == 1">
				<!-- 标题 -->
				<!-- <view class="movie-title rate-title">
					<view class="movie-score">
						<view class="rennum title-text">
							全部评价
						</view>
						<view class="collect">
							共192个评价
						</view>
					</view>
				</view> -->
				<!-- <view class="intro">
					<view class="uni-comment">
						<view class="uni-comment-list">
							<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
							<view class="uni-comment-body">
								<view class="uni-comment-top">
									<text>网友</text>
								</view>
								<view class="uni-comment-date">
									<text>08/10 08:12</text>
								</view>
								<view class="uni-comment-content">很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App</view>
							</view>
						</view>
						<view class="uni-comment-list">
							<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
							<view class="uni-comment-body">
								<view class="uni-comment-top">
									<text>马克一天</text>
								</view>
								<view class="uni-comment-content">很强大，厉害了我的uni-app!</view>
							</view>
						</view>
						<view class="uni-comment-list">
							<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
							<view class="uni-comment-body">
								<view class="uni-comment-top">
									<text>今生缘</text>
								</view>
								<view class="uni-comment-content">好牛逼的感觉，是不是小程序、App、移动端都互通了？</view>
								<view class="uni-comment-date">
									<text>08/10 07:55</text>
								</view>
							</view>
						</view>
						<view class="uni-comment-list">
							<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
							<view class="uni-comment-body">
								<view class="uni-comment-top">
									<text>小猫咪</text>
								</view>
								<view class="uni-comment-content">支持国产，支持DCloud!</view>
								<view class="uni-comment-date">
									<view>2天前</view><view class="uni-comment-replay-btn">5回复</view>
								</view>
							</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				tarList: [{
						"text": "简介"
					},
					{
						"text": "评价"
					}
				],
				change: 0,
				tbH: '',
				movie: [],
				num: 0,
				noCollect:true,
				yesCollect:false,
				is_collect:false,
				collect_text: '收藏',
				picUrl: this.$pictureUrl
			}
		},
		onLoad(obj) {
			this.num = obj.score;
			// 查询电影详情
			this.selMovieDetails(obj.movie_id);
		},
		onReady() {
			// #ifndef H5
			this.setTabbarMain();
			// #endif
		},
		methods: {
			changeTab(index) { // 切换选项卡
				this.change = index;
			},
			setTabbarMain() { // 计算高度
				let sys = uni.getSystemInfoSync();
				let view = uni.createSelectorQuery().select(".video-tabbar");
				view.fields({
					rect: true,
					size: true,
					scrollOffset: true
				}, data => {
					console.log("上边位置" + JSON.stringify(data.bottom));
					console.log("可使用屏幕高度" + JSON.stringify(sys));
					this.tbH = (sys.windowHeight - data.bottom) + 'px';
				}).exec();
			},
			selMovieDetails(movie_id) { // 查询电影详情
				uni.request({
					url: this.$serverUrl + '/api/details/selMovieDetails?movie_id='+movie_id,
					success: (ret) => {
						if (ret.statusCode !== 200 ) {
							console.log('请求失败', ret);
							return ;
						}
						if (ret.data.code == 0) {
							// 取数据并赋值
							this.movie = ret.data.data;
							// 添加记录
							this.addHistory(this.movie.movie_id);
							// 收藏状态
							this.isCollect(this.movie.movie_id);
						} else {
							console.log('未取得数据');
						}
					}
				});
			},
			addHistory(movie_id) { // 添加记录
				// 判断缓存用户信息存在否
				const userinfo = uni.getStorageSync('userinfo');
				if (!userinfo) {
					return ;
				}
				// 请求接口
				uni.request({
					url: this.$serverUrl + '/api/history/addHistory',
					method: 'POST',
					header:{
						'token':uni.getStorageSync('userinfo').token
					},
					data: {
						member_id: uni.getStorageSync('userinfo').member_id,
						movie_id:movie_id
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret);
							return;
						}
						if (ret.data.code == 0) {
							this.list = ret.data.data.list;
						} 
					}
				});
			},
			addCollect(movie_id) { //收藏
				// 判断按钮状态
				if (this.collect_text == '已收藏') {
					return ;
				}
				// 判断缓存用户信息存在否
				const userinfo = uni.getStorageSync('userinfo');
				if (!userinfo) {
					return ;
				}
				// 请求接口
				uni.request({
					url: this.$serverUrl + '/api/collect/addCollect',
					method: 'POST',
					header:{
						'token':uni.getStorageSync('userinfo').token
					},
					data: {
						member_id: uni.getStorageSync('userinfo').member_id,
						movie_id:movie_id
					},
					success: (ret) => {
						console.log(ret)
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret);
							return;
						}
						if (ret.data.code == 0) {
							this.yesCollect = true;
							this.noCollect = false;
							this.collect_text = '已收藏';
							console.log(ret.data.message)
						} 
					}
				});
			},
			isCollect(movie_id) {
				// 判断缓存用户信息存在否
				const userinfo = uni.getStorageSync('userinfo');
				if (!userinfo) {
					return ;
				}
				// 请求接口
				uni.request({
					url: this.$serverUrl + '/api/collect/isCollect',
					method: 'POST',
					header:{
						'token':uni.getStorageSync('userinfo').token
					},
					data: {
						member_id: uni.getStorageSync('userinfo').member_id,
						movie_id:movie_id
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret);
							return;
						}
						if (ret.data.code == 0) {
							this.yesCollect = true;
							this.noCollect = false;
							this.collect_text = '已收藏';
						} else {
							this.yesCollect = false;
							this.noCollect = true;
							this.collect_text = '收藏';
						}
					}
				});
			}
		}
	}
</script>

<style>
	.video-box {
		width: 100%;
		height: 423upx;
	}

	.video-box video {
		width: 100%;
		height: 100%;
	}

	.video-tabbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 92upx;
		background: #FFFFFF;
		padding: 0upx 90upx;
		border-top: 1px solid #e6eaf2;
		border-bottom: 1px solid #e6eaf2;
	}

	.tabbar-text {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 140upx;
		color: #333;
		font-size: 32upx;
	}

	.activeText {
		color: #2CC17B;
		border-bottom: 3px solid #2CC17B;
	}

	.tabbar-main {
		/* background: #FFFFFF; */
		overflow-y: scroll;
	}
	.movie-title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 168upx;
		padding: 0 30upx;
		background: #FFFFFF;
	}
	.movie-title view{
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.title-text {
		font-size: 32upx;
		color: #3C4A55;
	}
	.movie-score {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 24upx;
		color: #70788C;
	}
	.movie-score view {
		flex: 1;
	}
	.rennum {
		display: flex;
		flex-direction: row;
		justify-content: space-between !important;
	}
	.collect {
		display: flex;
		flex-direction: row;
		justify-content: flex-end !important;
	}
	
	.no-collect {
		padding:0 10upx;
		border:1px solid #2CC17B;
		color: #2CC17B;
		border-radius: 10upx;
	}
	.yes-collect {
		padding:0 10upx;
		color: #CCC;
	}
	.intro {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 30upx;
		background: #FFFFFF;
	}
	.intro-title {
		font-size: 30upx;
		font-weight: bold;
	}
	.intro-main {
		padding: 10upx 0upx;
		font-size: 28upx;
		color: #70788C;
	}
	.rate-title {
		height: 92upx;
		border-bottom: 1px solid #E6EAF2;
	}
	.uni-comment-face image {
		width: 70upx;
		height: 70upx;
	}
</style>
