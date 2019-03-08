<template>
  <audio
    crossOrigin="anonymous"
    @timeupdate="event => $emit('timeupdate', event.target.currentTime * 1000)"
    @ended="$emit('end')"
    @canplay="$emit('ready')"
    @error="$emit('error')"
    ref="player">
    <source v-if="src" :src="src" />
  </audio>
</template>

<script>
export default {
  data () {
    return {
      src: ''
    }
  },
  methods: {
    stop () {
      this.$refs.player.pause()
      this.$refs.player.currentTime = 0
    },
    load (track) {
      this.src = track.url
      this.$refs.player.load()
    },
    play () {
      this.$refs.player.play()
    },
    pause () {
      this.$refs.player.pause()
    },
    setVolume (volume) {
      this.$refs.player.volume = volume / 100
    },
    seekTo (time) {
      this.$refs.player.currentTime = time / 1000
    }
  }
}
</script>
