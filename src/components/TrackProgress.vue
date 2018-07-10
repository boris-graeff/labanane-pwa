<template>
  <div class='track-progress'>
    <input type='range'
           min='0'
           :max='duration'
           :value='currentTime'
           @input.prevent='val => $emit("seekTo", val)' />
    <span :style='{width: progression.toFixed(1) + "%"}'></span>
    <div>
      {{ currentTime | duration }}
      {{ duration | duration }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentTime', 'duration'],
  computed: {
    progression () {
      return this.currentTime / this.duration * 100
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '~@/styles/constants';

  input[type=range] {
    width: 100%;
  }

  .track-progress {
    > div:last-child {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
