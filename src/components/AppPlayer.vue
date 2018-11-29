<template>
  <div class="player" v-show="true || track.id">
    <audio-player ref="player"
                  @timeupdate="onTimeUpdate"
                  @ended="onEnded" />

    <track-progress :duration="duration"
                    :currentTime="currentTime"
                    @seekTo="seekTo"/>
    <div class="bottom">
      <div class="left">{{ track.name }}</div>

      <div class="center">
        <button type="button" @click="setPreviousTrack(isShuffleMode)">
          <img src="~@/assets/icn-previous.svg" />
        </button>

        <toggle-button :on="isPlaying" @click.native="togglePlaying">
          <img src="~@/assets/icn-play.svg" />
          <img src="~@/assets/icn-pause.svg" />
        </toggle-button>

        <button type="button" @click="setNextTrack(isShuffleMode)">
          <img src="~@/assets/icn-next.svg" />
        </button>
      </div>

      <div class="right">
        <toggle-button :on="isShuffleMode" @click.native="isShuffleMode = !isShuffleMode">
          <img src="~@/assets/icn-shuffle.svg" />
          <img src="~@/assets/icn-baseline.svg" />
        </toggle-button>

        <volume-slider v-model="volume" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ToggleButton from '@/components/ToggleButton'
import AppCheckbox from '@/components/AppCheckbox'
import AudioPlayer from './AudioPlayer'
import TrackProgress from './TrackProgress'
import VolumeSlider from './VolumeSlider'

export default {
  data () {
    return {
      isShuffleMode: false,
      isPlaying: false,
      currentTime: 500,
      duration: 0,
      volume: 50
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
    volume () {
      this.$refs.player.setVolume(this.volume)
    },
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
    togglePlaying () {
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) this.$refs.player.play()
      else this.$refs.player.pause()
    },
    onTimeUpdate (event) {
      const { currentTime, duration } = event.target
      this.currentTime = currentTime
      this.duration = duration
    },
    onEnded () {
      this.next()
    },
    seekTo (value) {
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
    VolumeSlider,
    ToggleButton,
    AppCheckbox
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

    /deep/ {
      button:hover {
        background: rgba($black, 0.05);
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left, .center, .right {
    display: flex;
    align-items: center;
  }

  .left, .right {
    flex: 1;
  }

  .center {
    min-width: 144px;
  }

  .left {
    font-size: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .right {
    justify-content: flex-end;
  }

  button {
    width: 48px;
    height: 48px;
    display: block;
    padding: 0;
    background: transparent;
    position: relative;
    border: 0;

    > img {
      width: 32px;
    }
  }
</style>
