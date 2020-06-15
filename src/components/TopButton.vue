<template>
  <div
    class="button"
    @click="onClick"
  >
    <span style="margin-left: auto; font-weight: bold;"><slot /></span>
    <div class="button__arrow">></div>
  </div>
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
  height: 2rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  width: 180px;
  padding: 10px 7px;
  padding-right: 0;
  box-shadow:
    0 10px 16px 0 rgba(0,0,0,0.2),
    0 6px 20px 0 rgba(0,0,0,0.19);
  margin-right: 30px;
  background-color: #ffffff;
  cursor: pointer;

  &__arrow {
    margin-left: 5px;
    height: calc(2rem + 10px);
    font-size: 1.2rem;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background: rgb(255,41,108);
    background: linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%);
    margin-left: auto;
  }
}
</style>
