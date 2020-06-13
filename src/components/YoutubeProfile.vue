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
      <div class="profile__subscribers">{{ profile.subscribers }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;

  &__info {}

  &__title {
    padding: 8px 10px;
    box-shadow:
      0 10px 16px 0 rgba(0,0,0,0.2),
      0 6px 20px 0 rgba(0,0,0,0.19);
  }

  &__subscribers {

  }

  &__thumbnail {
    height: 80px;
    width: 80px;
  }
}
</style>
