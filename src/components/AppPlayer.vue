<template>
  <div class="player">
    {{ track.name }}
    <soundcloud-player :track="track.provider === 'soundcloud' && track"/>
    <youtube-player :track="track.provider === 'youtube' && track"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SoundcloudPlayer from './SoundcloudPlayer'
import YoutubePlayer from './YoutubePlayer'

export default {
  computed: {
    ...mapState('track', {
      track: ({ infos }) => infos
    })
  },
  mounted () {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused'
      navigator.mediaSession.setActionHandler('previoustrack', () => {})
      navigator.mediaSession.setActionHandler('play', () => {})
      navigator.mediaSession.setActionHandler('pause', () => {})
      navigator.mediaSession.setActionHandler('nexttrack', () => {})
    }
  },
  methods: {
    handleNewTrack () {
      if ('mediaSession' in navigator) {
        // eslint-disable-next-line
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'titre',
          artist: 'artiste'
        })
      }
    }
  },
  components: {
    YoutubePlayer,
    SoundcloudPlayer
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
  }
</style>
