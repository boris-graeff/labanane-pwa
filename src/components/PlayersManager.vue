<template>
  <div>
    <native-player
      @timeupdate="setCurrentTime"
      @error="onError"
      @end="setNextTrack"
      ref="nativePlayer"/>

    <youtube-player
      v-if="isDesktopBrowser"
      @timeupdate="setCurrentTime"
      @end="setNextTrack"
      @error="onError"
      @ready="onYoutubePlayerReady"
      :class="{hide: !useYoutubeIframe}"
      ref="youtubePlayer" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NativePlayer from './NativePlayer'
import YoutubePlayer from './YoutubePlayer'

export default {
  beforeCreate () {
    this.currentPlayer = {
      stop: () => {},
      pause: () => {},
      load: () => {},
      play: () => {},
      setVolume: () => {}
    }
  },
  watch: {
    track () {
      this.currentPlayer.stop()
      this.currentPlayer = this.useYoutubeIframe ? this.$refs.youtubePlayer : this.$refs.nativePlayer
      this.currentPlayer.load(this.track)
      this.currentPlayer.setVolume(this.volume)
      this.currentPlayer.play()
      this.play()
    },
    isPlaying () {
      if (this.isPlaying) this.currentPlayer.play()
      else this.currentPlayer.pause()
    },
    seekTo () {
      this.currentPlayer.seekTo(this.seekTo)
    },
    volume () {
      this.currentPlayer.setVolume(this.volume)
    }
  },
  computed: {
    useYoutubeIframe () {
      return this.isDesktopBrowser && this.track.provider === 'youtube'
    },
    ...mapState('track', {
      track: ({ infos }) => infos
    }),
    ...mapState('player', {
      volume: ({ volume }) => volume,
      seekTo: ({ seekTo }) => seekTo,
      isPlaying: ({ isPlaying }) => isPlaying
    }),
    ...mapState('app', {
      isDesktopBrowser: ({ isDesktopBrowser }) => isDesktopBrowser
    })
  },
  methods: {
    onYoutubePlayerReady () {
      if (this.isPlaying) {
        this.currentPlayer.load(this.track)
        this.currentPlayer.play()
      }
    },
    onError () {
      this.setTrackError()
      this.setNextTrack()
    },
    ...mapActions({
      setCurrentTime: 'player/setCurrentTime',
      play: 'player/play',
      setTrackError: 'playlist/setTrackError',
      setNextTrack: 'track/setNextTrack'
    })
  },
  components: {
    NativePlayer,
    YoutubePlayer
  }
}
</script>

<style scoped lang="scss">
  .hide {
    opacity: 0;
  }
</style>
