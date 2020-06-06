<template>
  <button
    class="button"
    @click="onClick"
  >
    <slot />
    <div class="button__arrow">></div>
  </button>
</template>

<script>
export default {
  name: 'TopButton',
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  &__arrow {
    height: 100%;
    width: 7px;
    background: rgb(255,41,108);
    background: linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%);
  }
}
</style>
