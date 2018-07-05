<template>
  <div class='track-progress'>
    <input type='range'
           min='0'
           :max='duration'
           :value='progression'
           @input.prevent='val => $emit("seekTo", val)'
           :style='{width: progression.toFixed(1) + "%"}' />
    <span :style='{width: progression.toFixed(1) + "%"}'></span>
    <div>
      {{ currentTime | formatDuration }}
      {{ duration | formatDuration }}
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

</style>
