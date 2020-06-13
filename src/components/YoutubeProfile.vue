<script>
export default {
  name: 'YoutubeProfile',
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="profile">
    <img class="profile__thumbnail" :src="profile.thumbnail">
    <div class="profile__info">
      <div class="profile__title">{{ profile.title }}</div>
      <div class="profile__subscribers">구독자 {{ profile.subscribers }}명</div>
    </div>
    <div class="profile__status">
      <img class="profile__youtube" src="../assets/youtube.png">
      채널 인증 완료
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;

  &__info {
    margin-left: 15px;
  }

  &__title {
    padding: 5px 10px;
    box-shadow:
      0 5px 8px 0 rgba(0,0,0,0.2),
      0 3px 10px 0 rgba(0,0,0,0.19);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__subscribers {
    margin-top: 7px;
    padding: 5px 10px;
    box-shadow:
      0 5px 8px 0 rgba(0,0,0,0.2),
      0 3px 10px 0 rgba(0,0,0,0.19);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__status {
    margin-left: 13px;
    padding: 5px 10px;
    box-shadow:
      0 5px 8px 0 rgba(0,0,0,0.2),
      0 3px 10px 0 rgba(0,0,0,0.19);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__thumbnail {
    height: 80px;
    width: 80px;
  }

  &__youtube {
    height: 30px;
    display: block;
  }
}
</style>
