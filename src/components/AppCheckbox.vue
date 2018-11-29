<template>
  <label class="app-check" :class="{checked: value}">
    <input type="checkbox" :checked="value" @input="$emit('input', $event.target.checked)" />
    <div class="icon">
      <slot></slot>
    </div>
  </label>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .app-check {
    height: 40px;
    width: 40px;
    opacity: 0.3;
    transition: opacity 300ms ease-in;
    display: flex;
    align-items: center;
    justify-content: center;

    &.checked {
      opacity: 1;
    }

    &:hover {
      background: rgba($black, 0.1);
    }

    .icon > img {
      height: 32px;
      width: 32px;
    }

    input[type=checkbox] {
      display: none;
    }
  }
</style>
