(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{"0473":function(t,e,a){"use strict";a.r(e);var s=a("67e2"),o=a("5239");for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);a("b231");var n,c=a("f0c5"),r=Object(c["a"])(o["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],n);e["default"]=r.exports},5239:function(t,e,a){"use strict";a.r(e);var s=a("89c0"),o=a.n(s);for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);e["default"]=o.a},"614c":function(t,e,a){"use strict";(function(t){a("3798"),a("921b");s(a("66fd"));var e=s(a("0473"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},"67e2":function(t,e,a){"use strict";var s,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"b",function(){return o}),a.d(e,"c",function(){return i}),a.d(e,"a",function(){return s})},"89c0":function(t,e,a){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{movieList:[],movie_title:"",page:1,listRows:20,totalPage:1,picUrl:this.$pictureUrl}},onLoad:function(){this.searchData(this.movie_title,this.page,this.listRows),t.setStorageSync("search_flag",!1),t.setStorageSync("search_keyword",""),this.listenKeyword()},onReachBottom:function(){console.log(a("触底了"," at pages\\search\\search.vue:40")),console.log(a("当前page："+this.page," at pages\\search\\search.vue:41")),console.log(a("总页数："+this.totalPage," at pages\\search\\search.vue:42")),this.page=this.page+1,this.page>this.totalPage||this.searchData(this.movie_title,this.page,this.listRows)},methods:{toSearchDo:function(){t.navigateTo({url:"search_do",animationType:"slide-in-bottom",animationDuration:200})},toDetails:function(e,a){t.navigateTo({url:"../details/details?movie_id="+e+"&score="+a})},searchData:function(e,s,o){var i=this;t.request({url:this.$serverUrl+"/api/search/selMovieDetails?movie_title="+e+"&page="+s+"&listRows="+o,success:function(t){200===t.statusCode?0==t.data.code?(i.movieList=i.movieList.concat(t.data.data.list),i.totalPage=t.data.data.totalPage):console.log(a("未取得数据"," at pages\\search\\search.vue:76")):console.log(a("请求失败",t," at pages\\search\\search.vue:68"))}})},listenKeyword:function(){var e=this,a="";setInterval(function(){a=t.getStorageSync("search_keyword"),e.movie_title=a,t.getStorageSync("search_flag")&&(t.setStorageSync("search_flag",!1),e.movieList=[],e.page=1,e.searchData(e.movie_title,e.page,e.listRows))},500)}}};e.default=s}).call(this,a("6e42")["default"],a("0de9")["default"])},b231:function(t,e,a){"use strict";var s=a("df66"),o=a.n(s);o.a},df66:function(t,e,a){}},[["614c","common/runtime","common/vendor"]]]);