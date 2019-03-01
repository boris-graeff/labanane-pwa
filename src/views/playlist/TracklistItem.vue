<template>
  <track-item :track="track" class="track-item" :class="{ error: track.error }">
    <span class="index">{{ index + 1 }}</span>
    <div>
      <span class="provider" :class="`${track.provider}`"/>
      <div class="content">
        <span class="name">{{ track.name }}</span>
        <span v-if="track.error">Unavailabe</span>
        <div>
          <span class="duration">{{ track.duration | duration }}</span>

          <button v-if='isOwner' type='button' @click.stop='removeTrack(index)' />
        </div>
      </div>
    </div>
  </track-item>
</template>

<script>
import { mapActions } from 'vuex'
import TrackItem from '@/components/TrackItem'

export default {
  props: ['track', 'index', 'isOwner'],
  methods: {
    ...mapActions('playlist', {
      removeTrack: 'removeTrack'
    })
  },
  components: {
    TrackItem
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .track-item {
    button {
      height: 25px;
      width: 30px;
      min-width: 30px;
      padding: 0;
      background: url('~@/assets/icn-cross.svg') no-repeat;
      background-size: contain;
      background-position: center center;
      transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }

    &:hover button {
      opacity: 1;
      transform: scale(1) rotate(90deg);
    }

    &.error {
      opacity: 0.5;
      pointer-events: none;

      .name {
        text-decoration: line-through;
      }
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

  .content {
    display: flex;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
    }
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
