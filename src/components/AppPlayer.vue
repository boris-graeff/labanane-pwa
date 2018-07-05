<template>
  <div class="player">
    <audio-player ref="player"
                  @timeupdate="onTimeUpdate"
                  @ended="onEnded" />

    <track-progress :duration="track.duration"
                    :currentTime="currentTime"
                    @seekTo="seekTo"/>
    <div>
      <div>{{ track.name }}</div>

      <div class="controls">
        <button type="button" @click="setPreviousTrack(isShuffleMode)">Previous</button>
        <button type="button" v-show="isPlaying" @click="pause">Pause</button>
        <button type="button" v-show="!isPlaying" @click="play">Play</button>
        <button type="button" @click="setNextTrack(isShuffleMode)">Next</button>
        <button type="button" @click="isShuffleMode = !isShuffleMode">Shuffle mode</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AudioPlayer from './AudioPlayer'
import TrackProgress from './TrackProgress'

export default {
  data () {
    return {
      isShuffleMode: false,
      isPlaying: false,
      currentTime: 0
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
    onTimeUpdate (currentTime) {
      this.currentTime = currentTime
    },
    onEnded () {
      this.next()
    },
    seekTo (value) {
      console.log('seek to', value)
    },
    ...mapActions('track', {
      setNextTrack: 'setNextTrack',
      setPreviousTrack: 'setPreviousTrack'
    })
  },
  components: {
    TrackProgress,
    AudioPlayer
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  $player-height: 80px;

  .player {
    position: fixed;
    height: $player-height;
    background: $wheat;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;

    > div:last-child {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
