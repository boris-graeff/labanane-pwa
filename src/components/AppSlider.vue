<template>
  <div class="slider">
    <input type="range" v-bind="$attrs" v-on="$listeners" />
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .slider {
    position: relative;
    line-height: 0;

    input {
      position: relative;
      z-index: 1;
      margin: 0;
      height: 100%;
      cursor: pointer;
    }
  }

  /* Based on https://github.com/darlanrod/input-range-scss */

  $track-color: transparent !default;
  $thumb-height: 12px !default;
  $thumb-width: 12px !default;
  $track-width: 100% !default;
  $track-height: 12px !default;
  $track-border: none;

  @mixin track() {
    width: $track-width;
    height: $track-height;
    cursor: pointer;
    min-width: 100%;
    transition: all 300ms ease-in-out;
  }

  @mixin thumb() {
    height: $thumb-height;
    width: $thumb-width;
    border-radius: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  [type=range] {
    position: relative;
    -webkit-appearance: none;
    margin: $thumb-height / 2 0;
    width: $track-width;
    padding: 0;
    height: $track-height;
    background: $track-color;
    min-width: 100%;

    &:focus {
      outline: none;
    }

    &::-webkit-slider-runnable-track {
      @include track();
      background: $track-color;
      border: none;
      border-bottom: $track-border;
      border-radius: 0;
    }

    &::-webkit-slider-thumb {
      @include thumb();
      -webkit-appearance: none;
    }

    &:focus::-webkit-slider-runnable-track {
      background: $track-color;
    }

    &::-moz-range-track {
      @include track();
      background: $track-color;
      border: none;
      border-bottom: $track-border;
      border-radius: 0;
    }

    &::-moz-range-thumb {
      @include thumb();
    }

    &::-ms-track {
      @include track();
      background: $track-color;
      border-color: $track-color;
      border-width: $thumb-width 0;
      color: transparent;
    }

    &::-ms-fill-lower {
      background: $track-color;
      border-radius: 0;
    }

    &::-ms-fill-upper {
      background: $track-color;
      border-radius: 0;
    }

    &::-ms-thumb {
      @include thumb();
    }

    &:focus::-ms-fill-lower {
      background: $track-color;
    }

    &:focus::-ms-fill-upper {
      background: $track-color;
    }
  }

  [type='range']::-moz-focus-outer {
    border: 0;
  }
</style>
