(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/me"],{"263d":function(n,t,e){"use strict";(function(n,e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{nickname:"登陆/注册",head:"../../static/me/head.png"}},onLoad:function(){this.isLogin()},methods:{toHistory:function(){n.navigateTo({url:"history"})},toCollect:function(){n.navigateTo({url:"collect"})},toUppass:function(){n.navigateTo({url:"updpass"})},toFeedback:function(){n.navigateTo({url:"feedback"})},isLogin:function(){var t=n.getStorageSync("userinfo");t?(this.nickname=t.nickname,1==t.sex&&(this.head="../../static/me/boy.png"),2==t.sex&&(this.head="../../static/me/girl.png")):(this.nickname="登陆/注册",n.navigateTo({url:"../login/login"}))},outLogin:function(){n.showModal({title:"提示",content:"确定退出登录",confirmColor:"#FF4400",success:function(t){t.confirm?(n.removeStorageSync("userinfo"),n.reLaunch({url:"../index/index"})):t.cancel&&console.log(e("用户点击取消"," at pages\\me\\me.vue:94"))}})}}};t.default=o}).call(this,e("6e42")["default"],e("0de9")["default"])},"44ff":function(n,t,e){"use strict";(function(n){e("3798"),e("921b");o(e("66fd"));var t=o(e("65ad"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},"4b97":function(n,t,e){"use strict";var o=e("9b06"),a=e.n(o);a.a},"65ad":function(n,t,e){"use strict";e.r(t);var o=e("df8d"),a=e("c2cb");for(var i in a)"default"!==i&&function(n){e.d(t,n,function(){return a[n]})}(i);e("4b97");var c,u=e("f0c5"),r=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=r.exports},"9b06":function(n,t,e){},c2cb:function(n,t,e){"use strict";e.r(t);var o=e("263d"),a=e.n(o);for(var i in o)"default"!==i&&function(n){e.d(t,n,function(){return o[n]})}(i);t["default"]=a.a},df8d:function(n,t,e){"use strict";var o,a=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"b",function(){return a}),e.d(t,"c",function(){return i}),e.d(t,"a",function(){return o})}},[["44ff","common/runtime","common/vendor"]]]);