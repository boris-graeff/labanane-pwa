<template>
  <audio
    crossOrigin="anonymous"
    v-on="$listeners"
    :src="track.url"
    @play="play"
    @timeupdate="onTimeUpdate"
    @ended="onEnded"
    @canplay="canPlay"
    @error="onError"
    ref="player"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  watch: {
    isPlaying () {
      if (this.isPlaying) this.$refs.player.play()
      else this.$refs.player.pause()
    },
    seekTo () {
      this.$refs.player.currentTime = this.seekTo / 1000
    },
    volume () {
      this.$refs.player.volume = this.volume / 100
    }
  },
  methods: {
    canPlay () {
      this.$refs.player.play()
    },
    onTimeUpdate (event) {
      const { currentTime } = event.target
      this.setCurrentTime(currentTime * 1000)
    },
    onEnded () {
      this.setNextTrack()
    },
    onError () {
      this.setTrackError()
      this.setNextTrack()
    },
    ...mapActions({
      setNextTrack: 'track/setNextTrack',
      setCurrentTime: 'player/setCurrentTime',
      play: 'player/play',
      setTrackError: 'playlist/setTrackError'
    })
  },
  computed: {
    ...mapState('player', {
      isPlaying: ({ isPlaying }) => isPlaying,
      volume: ({ volume }) => volume,
      seekTo: ({ seekTo }) => seekTo
    }),
    ...mapState('track', {
      track: ({ infos }) => infos
    })
  }
}
</script>
