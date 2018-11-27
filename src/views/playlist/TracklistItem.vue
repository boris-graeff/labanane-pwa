<template>
  <song-item :song="track">
    <span class="index">{{ index + 1 }}</span>
    <div>
      <span class="provider" :class="`${track.provider}`"/>
      <div class="content">
        <span class="name">{{ track.name }}</span>
        <span class="duration">{{ track.duration | duration }}</span>
      </div>
    </div>
  </song-item>
</template>

<script>
import SongItem from '@/components/SongItem'

export default {
  props: ['track', 'index'],
  components: {
    SongItem
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .index {
    position: absolute;
    font-size: 10px;
    transform: translate(-$space-small, -50%);
    top: 50%;
    right: 100%;
    text-align: right;
    width: $space-big;
  }

  .content {
    display: flex;
    justify-content: space-between;
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
</style>
