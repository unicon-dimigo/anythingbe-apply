<script>
export default {
  name: 'App',
  methods: {
    openChatting () {
      window.open('http://pf.kakao.com/_mEixcxb/chat')
    }
  },
  created () {
    document.title = 'anythingBE - 지원하기'
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
@import url(//cdn.jsdelivr.net/npm/font-kopub@1.0/kopubdotum.min.css);
* { font-family: 'KoPub Dotum', 'Sans-serif'; }
#app { width: 100vw; }
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
  margin-right: 10px;

  &__logo {
    height: 100px;
    width: 100px;
  }
}

input[type=checkbox] {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #bcbcbc;
  cursor: pointer;
  background: rgb(255,41,108);
  background: linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%);
}
</style>
