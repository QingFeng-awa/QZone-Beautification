// ==UserScript==
// @name         QQ 空间美化
// @namespace    QingFeng-awa/QZone-Beautification
// @version      1.1.0
// @description  forked from MFn233/Ultra-Lite-QZone，重新排版并移除了许多冗余元素，搭配Dark Reader使用更佳。调整空间主页排版至社交元素以取得最佳使用效果。
// @icon         https://user.qzone.qq.com/favicon.ico
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @author       QingFeng
// @homepage     https://github.com/QingFeng-awa/QZone-Beautification
// @include       /^https?:\/\/[^/]*\.?qzone\.qq\.com\/.*$/
// @match        https://i.qq.com/?s_url=http%3A%2F%2Fuser.qzone.qq.com%2*
// @updateURL    https://github.com/QingFeng-awa/QZone-Beautification/raw/main/qzone.user.js
// @downloadURL  https://github.com/QingFeng-awa/QZone-Beautification/raw/main/qzone.user.js
// @supportURL   https://github.com/QingFeng-awa/QZone-Beautification/issues
// @license      AGPL-3.0
// ==/UserScript==

const config = {
    background: {
        get enable() { return GM_getValue('background_enable', true); },
        set enable(value) { GM_setValue('background_enable', value); },
        get cover() { return GM_getValue('background_cover', true); },
        set cover(value) { GM_setValue('background_cover', value); },
        src: "https://i0.imgs.ovh/2024/02/02/bsxwl.jpeg"
    },
    animation: {
        get transition() { return GM_getValue('animation_transition', true); },
        set transition(value) { GM_setValue('animation_transition', value); }
    }
};

// 注册菜单命令
GM_registerMenuCommand('背景美化：' + (config.background.enable ? '✅ 开启' : '❌ 关闭'), () => {
    config.background.enable = !config.background.enable;
    location.reload(); // 切换后刷新页面以应用更改
});

GM_registerMenuCommand('背景暗角：' + (config.background.cover ? '✅ 开启' : '❌ 关闭'), () => {
    config.background.cover = !config.background.cover;
    location.reload();
});

GM_registerMenuCommand('过渡动画：' + (config.animation.transition ? '✅ 开启' : '❌ 关闭'), () => {
    config.animation.transition = !config.animation.transition;
    location.reload();
});

GM_registerMenuCommand('重置全部设置', () => {
    if (confirm('确定要重置全部设置为默认值吗？')) {
        GM_setValue('background_enable', true);
        GM_setValue('background_cover', true);
        GM_setValue('animation_transition', true);
        location.reload();
    }
});

(function () {
    'use strict';
    GM_addStyle(".lay_wrap .lay_foot .login_device li a:hover {top:0 !important;background-color: #000000aa;border-radius: 15px;}");
    //登陆界面下方图标抖动bug。。。解决方式就是直接不位移
    GM_addStyle("ul#feed_friend_list {border: 1px #e6e6e6 solid !important;border-radius: 3px;background: white;width: fit-content;}");
    GM_addStyle(".fn-feed-control-v2 .control-inner {border: 1px #e6e6e6 solid !important;border-radius: 3px;background: white;}");
    //去VIP等
    GM_addStyle(".layout-nav .head-avatar {border: 1px #e6e6e6 solid !important;border-radius: 3px;bottom: 60px;");
    GM_addStyle("div#vipBottomAdContainer {display: none;}");
    //头像位置
    GM_addStyle(".layout-nav .head-avatar .head-avatar-edit .avatar-edit-list {top: -60px;position: absolute;width: 120px;height: 60px;}");
    //修改头像优化
    GM_addStyle(".head-nav .head-nav-menu {background-color:white; width: 912px;height: 50px;font-size: 14px;margin-left: -150px;border: 1px #e6e6e6 solid !important;border-radius: 3px;}")
    //头像下一排边框。。。可见架构混乱程度
    GM_addStyle(".layout-head .head-info {position: absolute;top: 180px;left: 680px !important;}");
    GM_addStyle("div#visitorsDiv {top: 170px;left: 850px;}");
    //info位置（就是空间名字）
    GM_addStyle(".layout-head .head-info, .layout-head .head-description a, .layout-head .head-name .user-name, .layout-head .head-detail-name .user-name, .layout-head .qz-progress-bar .progress-bar-info {color: white;}");
    GM_addStyle(".layout-head .weather-module, .layout-head .visit-module {color: antiquewhite;}");
    //字体颜色修改
    GM_addStyle("a#site_hot_btn {display: none !important;}");
    GM_addStyle(".mod-side-nav.mod-side-nav-recently-used {display: none;}");
    //去广告
    GM_addStyle(".ui_avatar {border-radius: 100%;overflow: hidden;}");
    GM_addStyle(".feed .avatar a {border-radius: 100%;}");
    //圆形头像
    GM_addStyle("div#ifeedsContainer {background-color: white;}");
    //主要部分白色背景，为了防止添加背景后的连接处透明
    //以下是其他界面适配。。。（以上是main）
    GM_addStyle("div#feed_me {border: 1px #e6e6e6 solid !important;position: absolute;width: 592px;}");
    GM_addStyle("div#qz_poster_v4_editor_container_1 {border: 0.5px #e6e6e6 solid !important;width: 592px !important;}");
    GM_addStyle(".bg_mode.bg {border: 1px #e6e6e6 solid !important;padding-bottom: 100px;}");
    GM_addStyle(".mod_wrap.bg.mod-wrap {border: 1px #e6e6e6 solid !important;}");
    GM_addStyle(".top-fix-bar .top-fix-inner {background-color: #000000cc;box-shadow: 1px 1px 5px #000000bb;}");//top bar
    GM_addStyle("div#_qz_zoom_detect {display: none;}");//奇怪的flash。。
    GM_addStyle(".fn-dialog-hide-feed {background: white;}");

    if (config.animation.transition) {
        //过渡动画
        GM_addStyle("html{transition: all 0.5s ease-out;}");
    }
    if (config.background.enable) {
        //主要部分边框重写，防止无背景时与背景相连
        GM_addStyle(".bg-body{background-image:none !important;background-color:#dcdcdc;}");
        GM_addStyle(".background-container{background-image:none !important;}");
        //去除原本的背景图
        GM_addStyle("a.qz-btn-vip.qz-btn-vip-open {visibility: hidden;}");
        GM_addStyle(".profile-hd-actions{display: none !important;}");
        GM_addStyle("i.ui-icon.icon-vip {display: none !important;}");
        let bgimg = document.createElement("div");
        bgimg.setAttribute("class", "bgimg");
        document.body.append(bgimg);
        GM_addStyle(".bgimg {z-index: -5;position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: url(" + config.background.src + ") fixed !important;}");
    }
    if (config.background.cover) {
        //背景暗角（来自limestart）
        let cover = document.createElement("div");
        cover.setAttribute("class", "cover");
        document.body.append(cover);
        GM_addStyle(".cover {z-index: -2;position: fixed;left: 0;top: 0;width: 100%;height: 100%;background-image: radial-gradient(rgba(0,0,0,0) 0,rgba(0,0,0,.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,.3) 166%);transition: .25s;}");
    }

    GM_addStyle(".layout-nav {background: transparent;}");
    GM_addStyle(".layout-background {background: transparent;}");
    //访问其他人的空间时遇到的小bug，改成透明就解决了
})();