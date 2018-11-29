<template>
  <button v-bind="$props">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  @import '~@/styles/constants';

  button {
    height: 40px;
    padding: 6px 12px;
    background: rgba($black, 0.1);
    font-style: italic;
    font-size: 18px;
    font-weight: 700;
    font-family: 'Roboto Condensed';

    &:hover {
      opacity: 0.8;
    }
  }
</style>
