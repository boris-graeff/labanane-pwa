<template>
  <div class='track-progress'>
    <app-slider min='0'
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
import AppSlider from './AppSlider'

export default {
  props: ['currentTime', 'duration'],
  computed: {
    progression () {
      return this.currentTime / this.duration * 100
    }
  },
  components: {
    AppSlider
  }
}
</script>

<style scoped lang='scss'>
  @import '~@/styles/constants';

  input[type=range] {
    width: 100%;
  }

  .track-progress {
    position: relative;

    > *:first-child {
      z-index: 1;
    }

    > div:last-child {
      position: absolute;
      z-index: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
  }
</style>
