<template>
  <div class='volume-slider'>
    <toggle-button :on="value" @click.native="onToggle">
      <img src="~@/assets/icn-volume-off.svg" />
      <img src="~@/assets/icn-volume-on.svg" />
    </toggle-button>

    <app-slider class="slider"
                min='0'
                max='100'
                :value='value'
                @input='$emit("input", Number($event.target.value))'>
      <span :style='{width: value + "%"}' />
    </app-slider>
  </div>
</template>

<script>
import ToggleButton from '@/components/ToggleButton'
import AppSlider from './AppSlider'

export default {
  props: ['value'],
  data () {
    return {
      valueBeforeMuted: 100
    }
  },
  methods: {
    onToggle () {
      if (!this.value) this.$emit('input', this.valueBeforeMuted)
      else {
        this.valueBeforeMuted = this.value
        this.$emit('input', 0)
      }
    }
  },
  components: {
    AppSlider,
    ToggleButton
  }
}
</script>

<style scoped lang="scss">
  .volume-slider {
    display: flex;
    align-items: center;
  }

  .slider {
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
      opacity: 0.2;
      background-image: url('~@/assets/volume-slider.svg');
    }

    span {
      background-image: url('~@/assets/volume-slider.svg');
    }
  }
</style>
