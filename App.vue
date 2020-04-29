<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import  url('./common/iconfont.css');
	/*全局公共css */
	body ,page ,.page{
		background-color: #f7f7f7;
	}
	.page {
		width: 100%;
		position: absolute;
	}
	.mt-20 {
		margin-top: 20upx;
	}
	.mt-30 {
		margin-top: 30upx;
	}
	.mt-60 {
		margin-top: 60upx;
	}
	.mb-20 {
		margin-bottom: 20upx;
	}
	.full-tabbar {
		height: 50px;
	}
	.no-border {
		border: none !important;
	}
</style>
