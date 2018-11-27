<template>
  <li :class='song.provider'>
    <div>
      <slot></slot>
    </div>
  </li>
</template>

<script>
export default {
  props: ['song']
}
</script>

<style scoped lang='scss'>
  @import '~@/styles/constants';

  li {
    display: flex;
    align-items: center;

    > div {
      padding-right: 6px;
      padding-left: 40px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 6px;
      transform: translateY(-50%);
      height: 12px;
      width: 30px;
      opacity: 0.7;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }

    &.youtube:before {
      background-image: url('~@/assets/icn-you-tube.svg') // you-tube adblock hack
    }

    &.soundcloud:before {
      background-image: url('~@/assets/icn-soundcloud.svg')
    }
  }
</style>
