<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
/*清除内外边距*/
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td,
img {
  margin: 0;
  padding: 0;
  border: medium none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
* {
  box-sizing: border-box;
}
em {
  font-style: normal;
}
/*禁用页面文本复制、禁用系统默认菜单、禁止链接点击高亮的处理*/
* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: auto; /*禁用文本复制*/
  -webkit-tap-highlight-color: transparent; /*取消点击链接或者JavaScript可点击元素赋给的高亮背景色*/
  -webkit-overflow-scrolling: touch;
}
/*重置列表元素*/
ul,
li {
  list-style: none;
}
/*重置超链接元素*/
a {
  text-decoration: none;
  color: #333333;
}
a:hover {
  text-decoration: none;
}
/*input消除默认，取消在手机上的点击高亮效果*/
input {
  outline: none;
}
/*重置图片元素*/
img {
  border: 0px;
  vertical-align: middle;
}
/*重置表格元素*/
table {
  border-collapse: collapse;
  border-spacing: 0;
}
html,
body {
  font-size: 11px;
  font-family: Helvetica;
  height: 100%;
  color: #333;
}
/*==计算以下font-size值 375*40/750==*/
html {
  font-size: 40px;
}
@media (min-width: 320px) {
  html {
    font-size: 15.8px;
  }
}
@media (min-width: 360px) {
  html {
    font-size: 19.2px;
  }
} /*安卓用到的*/
@media (min-width: 375px) {
  html {
    font-size: 20px;
  }
} /*6用到的*/
@media (min-width: 384px) {
  html {
    font-size: 20.48px;
  }
}
@media (min-width: 414px) {
  html {
    font-size: 22px;
  }
} /*6p用到的*/
@media (min-width: 448px) {
  html {
    font-size: 23.89x;
  }
}
@media (min-width: 480px) {
  html {
    font-size: 25.6px;
  }
}
@media (min-width: 512px) {
  html {
    font-size: 27.3px;
  }
}
@media (min-width: 544px) {
  html {
    font-size: 29.01px;
  }
}
@media (min-width: 576px) {
  html {
    font-size: 30.72px;
  }
}
@media (min-width: 608px) {
  html {
    font-size: 32.43px;
  }
}
@media (min-width: 640px) {
  html {
    font-size: 24px;
  }
}

@media (min-width: 750px) {
  html {
    font-size: 25px;
  }
} /*iPad修改*/
@media (min-width: 800px) {
  html {
    font-size: 42.67px;
  }
}
@media (min-width: 1024px) {
  html {
    font-size: 54.61px;
  }
}
</style>
