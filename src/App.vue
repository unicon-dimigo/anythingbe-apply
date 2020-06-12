<script>
export default {
  name: 'App',
  methods: {
    openChatting () {
      window.open('http://pf.kakao.com/_mEixcxb/chat')
    }
  }
}
</script>

<template>
  <div id="app">
    <router-view/>
    <div
      @click="openChatting"
      class="kakao-button"
    >
      <img class="kakao-button__logo" src="./assets/kakao.png">
    </div>
  </div>
</template>

<style lang="scss">
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
* { font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif'; }
.kakao-button {
  width: 55px;
  height: 55px;
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: yellow;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:
    0 10px 16px 0 rgba(0,0,0,0.2),
    0 6px 20px 0 rgba(0,0,0,0.19);

  &__logo {
    height: 100px;
    width: 100px;
  }
}
</style>
