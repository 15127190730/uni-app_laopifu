import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$serverUrl = 'http://api.laopifu.top/';

Vue.prototype.$pictureUrl = 'http://api.laopifu.top/';
Vue.prototype.$nullMovie = [{
		'vod_name': '正在加载...',
		'vod_pic': '/static/loading.gif',
		'vod_id': '0'
	},
	{
		'vod_name': '正在加载...',
		'vod_pic': '/static/loading.gif',
		'vod_id': '0'
	},
	{
		'vod_name': '正在加载...',
		'vod_pic': '/static/loading.gif',
		'vod_id': '0'
	},
	{
		'vod_name': '正在加载...',
		'vod_pic': '/static/loading.gif',
		'vod_id': '0'
	},
	{
		'vod_name': '正在加载...',
		'vod_pic': '/static/loading.gif',
		'vod_id': '0'
	},
	{
		'vod_name': '正在加载...',
		'vod_pic': '/static/loading.gif',
		'vod_id': '0'
	},
	{
		'vod_name': '正在加载...',
		'vod_pic': '/static/loading.gif',
		'vod_id': '0'
	},
	{
		'vod_name': '正在加载...',
		'vod_pic': '/static/loading.gif',
		'vod_id': '0'
	},
	{
		'vod_name': '正在加载...',
		'vod_pic': '/static/loading.gif',
		'vod_id': '0'
	}
];
Vue.prototype.$Basetype = [{
		title: '电影',
		isMutiple: false,
		key: 'type_id',
		detailList: [{
				title: '电影',
				value: 1
			},
			{
				title: '喜剧片',
				value: 7
			},
			{
				title: '动作片',
				value: 6
			},
			{
				title: '爱情片',
				value: 8
			},
			{
				title: '科幻片',
				value: 9
			},
			{
				title: '恐怖片',
				value: 10
			},
			{
				title: '剧情片',
				value: 11
			},
			{
				title: '战争片',
				value: 12
			},
			{
				title: '纪录片',
				value: 33
			}
		]
	},
	{
		title: '连续剧',
		isMutiple: false,
		key: 'type_id',
		detailList: [{
				title: '连续剧',
				value: 2
			},
			{
				title: '国产剧',
				value: 13
			},
			{
				title: '港台剧',
				value: 14
			},
			{
				title: '日韩剧',
				value: 15
			}
		]
	},
	{
		title: '综艺',
		isMutiple: false,
		key: 'type_id',
		detailList: [{
				title: '综艺',
				value: 3
			},
			{
				title: '内地综艺',
				value: 26
			}
		]
	},
	{
		title: '动漫',
		isMutiple: false,
		key: 'type_id',
		detailList: [{
				title: '动漫',
				value: 4
			},
			{
				title: '国产动漫',
				value: 23
			},
			{
				title: '日韩动漫',
				value: 24
			},
			{
				title: '欧美动漫',
				value: 25
			},
			{
				title: '港台动漫',
				value: 29
			},
			{
				title: '海外动漫',
				value: 30
			}
		]
	}
]
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
