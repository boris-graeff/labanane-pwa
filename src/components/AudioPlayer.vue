<template>
  <audio
    crossOrigin="anonymous"
    v-on="$listeners"
    :src="track.url"
    autoplay
    ref="player"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('track', {
      track: ({ infos }) => infos
    })
  },
  methods: {
    play () {
      this.$refs.player.play()
    },
    pause () {
      this.$refs.player.pause()
    },
    setVolume (volume) {
      this.$refs.player.volume = volume / 100
    },
    seekTo (position) {
      this.$refs.player.currentTime = position
    }
  }
}
</script>
