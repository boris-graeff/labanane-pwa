<template>
  <div class="player" v-show="true || track.id">
    <audio-player ref="player"
                  @timeupdate="onTimeUpdate"
                  @ended="onEnded" />

    <track-progress :duration="duration"
                    :currentTime="currentTime"
                    @seekTo="seekTo"/>
    <div class="bottom">
      <div>{{ track.name }}</div>

      <div>
        <button type="button" @click="setPreviousTrack(isShuffleMode)" class="previous" />
        <button type="button" v-show="isPlaying" @click="pause" class="pause" />
        <button type="button" v-show="!isPlaying" @click="play" class="play" />
        <button type="button" @click="setNextTrack(isShuffleMode)" class="next" />
      </div>

      <div>
        <button type="button" @click="isShuffleMode = !isShuffleMode" class="shuffle" />
        <volume-slider v-model="volume" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AudioPlayer from './AudioPlayer'
import TrackProgress from './TrackProgress'
import VolumeSlider from './VolumeSlider'

export default {
  data () {
    return {
      isShuffleMode: false,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 100
    }
  },
  computed: {
    ...mapState('track', {
      track: ({ infos }) => infos
    })
  },
  mounted () {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused'
      navigator.mediaSession.setActionHandler('previoustrack', this.setPreviousTrack)
      navigator.mediaSession.setActionHandler('play', () => {})
      navigator.mediaSession.setActionHandler('pause', () => {})
      navigator.mediaSession.setActionHandler('nexttrack', this.setNextTrack)
    }
  },
  watch: {
    track () {
      if ('mediaSession' in navigator) {
        // eslint-disable-next-line
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.track.name
        })
      }
    }
  },
  methods: {
    play () {
      this.isPlaying = true
      this.$refs.player.play()
    },
    pause () {
      this.isPlaying = false
      this.$refs.player.pause()
    },
    onTimeUpdate (event) {
      const { currentTime, duration } = event.target
      this.currentTime = currentTime
      this.duration = duration
    },
    onEnded () {
      this.next()
    },
    seekTo (event) {
      const { value } = event.target
      this.$refs.player.seekTo(value)
    },
    ...mapActions('track', {
      setNextTrack: 'setNextTrack',
      setPreviousTrack: 'setPreviousTrack'
    })
  },
  components: {
    TrackProgress,
    AudioPlayer,
    VolumeSlider
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .player {
    position: fixed;
    height: $player-height;
    background: $wheat;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    padding: 0 $space-small $space-small;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      align-items: center;
    }
  }

  button {
    width: 48px;
    height: 48px;
    display: block;
    padding: 0;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: 40px;
    background-position: center center;
    position: relative;
    border: 0;

    &.play {
      background-image: url('~@/assets/icn-play.svg');
    }

    &.pause {
      background-image: url('~@/assets/icn-pause.svg');
    }

    &.next {
      background-image: url('~@/assets/icn-next.svg');
    }

    &.previous {
      background-image: url('~@/assets/icn-previous.svg');
    }

    &.shuffle {
      background-image: url('~@/assets/icn-shuffle.svg');
    }
  }
</style>
