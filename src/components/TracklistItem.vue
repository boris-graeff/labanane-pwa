<template>
  <li class="track">
    <span class="index">{{ index }}</span>
    <div>
      <span class="provider" :class="`${track.provider}`"/>
      <div>
        <span class="name">{{ track.name }}</span>
        <span class="duration">{{ track.duration | duration }}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['track', 'index']
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .track > div {
    display: flex;
    align-items: center;
  }

  .provider {
    + div {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .index {
    position: absolute;
    font-size: 10px;
    transform: translate(-$space-small, -50%);
    top: 50%;
    right: 100%;
    text-align: right;
    width: $space-big;
  }

  .name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .duration {
    display: inline-block;
    font-size: 14px;
    min-width: 54px;
    text-align: right;
    padding-right: $space-small;
  }

  .provider {
    display: inline-block;
    width: 30px;
    height: 12px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    &.youtube {
      background-image: url('~@/assets/icn-you-tube.svg')
    }

    &.soundcloud {
      background-image: url('~@/assets/icn-soundcloud.svg')
    }
  }
</style>
