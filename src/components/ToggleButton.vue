<template>
  <button type="button" :class='{"on": on}' class="toggle-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['on']
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .toggle-button {
    position: relative;
    padding: 0;
    height: 48px;
    width: 48px;
    background-color: rgba($wheat, 0.15);
    transition: background-color 200ms ease-in-out;

    &:hover {
      background-color: rgba($wheat, 0.8);
    }

    > * {
      position: absolute;
      top: 8px;
      left: 8px;
      height: 32px;
      width: 32px;
      transition: opacity 200ms 200ms ease-in-out, transform 200ms 200ms ease-in-out;

      &:last-child {
        transform: scale(0) rotate(90deg);
        opacity: 0;
        transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
      }
    }

    &.on {
      > *:first-child {
        transform: scale(0) rotate(90deg);
        opacity: 0;
        transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
      }

      > *:last-child {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
</style>
