<template>
  <div class='volume'>
    {{ volume }}
    <app-slider class='slider'
            min='0'
            max='100'
            :value='volume'
            @input.prevent='val => $emit("input", val)' />
      <span :style='{width: volume + "%"}' />
  </div>
</template>

<script>
  import AppSlider from './AppSlider';

  export default {
    props: ['volume'],
    components: {
      AppSlider
    }
  }
</script>

<style scoped lang="scss">
  .volume {
    position: relative;
    width: 200px;
    height: 12px;

    &:before, span {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      z-index: 0;
    }

    &:before {
      content: '';
      right: 0;
      opacity: 0.7;
      background-image: url('~@/assets/volume-slider.svg');
    }

    span {
      background-image: url('~@/assets/volume-slider.svg');
    }
  }

  .slider {
    z-index: 1;
  }
</style>
