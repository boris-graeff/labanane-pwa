<template>
  <div class="player">
    {{ track.name }}
    <audio-player ref="player"
                  @timeupdate="onTimeUpdate"
                  @ended="onEnded" />
    <div class="controls">
      <button type="button" @click="setPreviousTrack">Previous</button>
      <button type="button" @click="play">Play</button>
      <button type="button" @click="setNextTrack">Next</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AudioPlayer from './AudioPlayer'

export default {
  data () {
    return {
      player: null
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
      this.$refs.player.play()
    },
    pause () {
      console.log('pause')
    },
    onTimeUpdate () {
      console.log('on time update')
    },
    onEnded () {
      this.next()
    },
    ...mapActions('track', {
      setNextTrack: 'setNextTrack',
      setPreviousTrack: 'setPreviousTrack'
    })
  },
  components: {
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
  }
</style>
