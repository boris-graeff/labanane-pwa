<template>
  <div class='track-progress'>
    <app-slider class="slider"
                min='0'
                :max='duration'
                :value='currentTime'
                @input.prevent='$emit("seekTo", Number($event.target.value))'>
      <span :style='{width: progression.toFixed(1) + "%"}'></span>
    </app-slider>
    <div>
      <span>{{ currentTime | duration }}</span>
      <span>{{ duration | duration }}</span>
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

  .track-progress {
    position: relative;

    > div:last-child {
      z-index: 0;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-top: -6px;
    }
  }

  .slider {
    width: 100%;
    height: 24px;

    &:before, span {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 12px;
      z-index: 0;
      height: 2px;
      border-radius: 6px;
    }

    &:before {
      content: '';
      right: 0;
      background: rgba($black, 0.2);
    }

    span {
      background: $black;
    }
  }
</style>
