<template>
  <div class="youtube-player">
    <div id="youtube-player"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted () {
    this.loadAPI()
  },
  methods: {
    stop () {
      this.player && this.player.stopVideo()
    },
    load (track) {
      this.player && this.player.loadVideoById({ videoId: track.providerId })
    },
    play () {
      if (this.player) this.player.playVideo()
    },
    pause () {
      this.player && this.player.pauseVideo()
    },
    setVolume (volume) {
      this.player && this.player.setVolume(volume)
    },
    seekTo (time) {
      const allowSeekAhead = true
      this.player && this.player.seekTo(time / 1000, allowSeekAhead)
      this.$emit('timeupdate', time)
    },
    onPlayerReady ({ target }) {
      this.player = target
      this.$emit('ready')
    },
    async onPlayerStateChange (event) {
      const YT = window.YT
      if (event.data === YT.PlayerState.PLAYING) {
        this.play()

        this.timer = setInterval(async () => {
          const currentTime = await this.player.getCurrentTime()
          this.$emit('timeupdate', currentTime * 1000)
        }, 1000)

        // Should be removed
        const duration = await this.player.getDuration()
        this.setTrackDuration(duration * 1000)
      } else {
        this.resetTimer()
        if (event.data === 0) {
          this.$emit('end')
        }
      }
    },
    onError () {
      this.$emit('error')
    },
    loadAPI () {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        const YT = window.YT
        new YT.Player('youtube-player', { // eslint-disable-line no-new
          height: '100%',
          width: '100%',
          playerVars: {
            controls: 0,
            showinfo: 0,
            modestbranding: 1
          },
          events: {
            onReady: this.onPlayerReady,
            onStateChange: this.onPlayerStateChange,
            error: this.onError
          }
        })
      }
    },
    resetTimer () {
      clearInterval(this.timer)
      this.timer = null
    },
    ...mapActions({
      setTrackDuration: 'track/setTrackDuration'
    })
  },
  beforeDestroy () {
    this.resetTimer()
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .youtube-player {
    position: fixed;
    top: -$player-height;
    left: 0;
    bottom: $player-height;
    right: 0;
    z-index: -1;
    transition: opacity 300ms ease;
    opacity: 0.1;
    pointer-events: none;
  }
</style>
