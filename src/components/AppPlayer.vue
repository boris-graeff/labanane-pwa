<template>
  <div class="player" v-show="true || track.id">
    <audio-player />

    <track-progress :duration="track.duration"
                    :currentTime="currentTime"
                    @seekTo="seekTo"/>

    <div class="bottom">
      <div class="left">
        <div class="track-name">{{ track.name }}</div>
      </div>

      <div class="center">
        <button type="button" @click="setPreviousTrack()">
          <img src="~@/assets/icn-previous.svg" />
        </button>

        <toggle-button :on="isPlaying" @click.native="isPlaying ? pause() : play()">
          <img src="~@/assets/icn-play.svg" />
          <img src="~@/assets/icn-pause.svg" />
        </toggle-button>

        <button type="button" @click="setNextTrack()">
          <img src="~@/assets/icn-next.svg" />
        </button>
      </div>

      <div class="right">
        <toggle-button :on="isShuffleMode" @click.native="setShuffleMode(!isShuffleMode)">
          <img src="~@/assets/icn-baseline.svg" title="Classic play" />
          <img src="~@/assets/icn-shuffle.svg" title="Shuffle play"/>
        </toggle-button>

        <volume-slider class="volume-slider" :value="volume" @input="setVolume($event)"/>
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
  computed: {
    ...mapState('track', {
      track: ({ infos }) => infos
    }),
    ...mapState('player', {
      isShuffleMode: ({ isShuffleMode }) => isShuffleMode,
      isPlaying: ({ isPlaying }) => isPlaying,
      volume: ({ volume }) => volume,
      currentTime: ({ currentTime }) => currentTime
    })
  },
  mounted () {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused'
      navigator.mediaSession.setActionHandler('previoustrack', this.setPreviousTrack)
      navigator.mediaSession.setActionHandler('play', this.play)
      navigator.mediaSession.setActionHandler('pause', this.pause)
      navigator.mediaSession.setActionHandler('nexttrack', this.setNextTrack)
    }
  },
  watch: {
    track () {
      if ('mediaSession' in navigator) {
        // eslint-disable-next-line
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.track.name,
          artwork: [{ src: this.track.artwork }]
        })
      }
    }
  },
  methods: {
    ...mapActions({
      setNextTrack: 'track/setNextTrack',
      setPreviousTrack: 'track/setPreviousTrack',
      setShuffleMode: 'player/setShuffleMode',
      play: 'player/play',
      pause: 'player/pause',
      setVolume: 'player/setVolume',
      seekTo: 'player/seekTo'
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

    > .track-name {
      display: none;
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

  .track-name {
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

  @media screen and (max-width: 600px) {
    .volume-slider {
      display: none;
    }

    .left .track-name {
      display: none;
    }
  }
</style>
