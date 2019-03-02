<template>
  <div class="playlist-content">
    <div class='infos' v-show='tracks.length > 1'>
      <span>{{ tracks.length }} tracks</span>
      <span>{{ playlistDuration | duration }}</span>
    </div>

    <div>
      <toggle-button @click.native="$emit('toggleActionsPanel')" :on="expandActionsPanel" >
        <img src="~@/assets/icn-edit.svg" />
        <img src="~@/assets/icn-cross.svg" />
      </toggle-button>
      <h1>{{ name }}</h1>
    </div>

    <app-list class="tracks" @dragover.native.prevent @drop.native='onDropEnd'>
      <tracklist-item v-for="(track, index) in tracks"
                      :key="track.id"
                      :index="index"
                      :track="track"
                      :isOwner="isOwner"
                      :class="{selected: track.id === currentTrack.id}"
                      @dragover.native.prevent
                      @drop.native.stop='onDrop(index, $event)'
                      @dragstart.native='onDragStart(track, index, $event)'
                      :draggable='isOwner'
                      @click.native="setTrack(track)" />
    </app-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AppList from '@/components/AppList'
import ToggleButton from '@/components/ToggleButton'
import TracklistItem from './TracklistItem'

export default {
  props: ['expandActionsPanel'],
  computed: {
    ...mapState('playlist', {
      tracks: ({ tracks }) => tracks,
      name: ({ name }) => name,
      isOwner: ({ isOwner }) => isOwner
    }),
    ...mapState('track', {
      currentTrack: ({ infos }) => infos
    }),
    ...mapGetters('playlist', {
      playlistDuration: 'duration'
    })
  },
  methods: {
    onDropEnd (event) {
      const track = JSON.parse(event.dataTransfer.getData('track'))
      track.id ? this.moveTrack({ track }) : this.addTrack({ track })
    },
    onDrop (index, event) {
      const track = JSON.parse(event.dataTransfer.getData('track'))
      track.id ? this.moveTrack({ track, index }) : this.addTrack({ track, index: index + 1 })
    },
    onDragStart (track, index, event) {
      track.index = index
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('track', JSON.stringify(track))
    },
    ...mapActions({
      setTrack: 'track/setTrack',
      addTrack: 'playlist/addTrack',
      moveTrack: 'playlist/moveTrack'
    })
  },
  components: {
    AppList,
    TracklistItem,
    ToggleButton
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .playlist-content {
    position: relative;
    background-color: rgba($wheat, .15);
    min-height: 100vh;
    padding-top: 30px;
    padding-left: 60px;
    padding-bottom: $player-height;

    h1 {
      font-size: 40px;
      font-weight: 300;
      margin: $space-small 0;
    }

    > div:nth-child(2) {
      display: flex;
      align-items: center;

      > button {
        margin: 6px 6px 6px 0;
        display: none;
      }
    }
  }

  .infos {
    display: inline-block;
    font-size: 16px;
    vertical-align: top;
    border: 1px solid rgba($black, 0.1);

    span {
      padding: 3px 4px;
      display: inline-block;

      &:first-child {
        background: rgba($black, 0.1);
      }
    }
  }

  .tracks {
    min-height: calc(100vh - 180px);
  }

  @media screen and (max-width: 600px) {
    .playlist-content {
      h1 {
        font-size: 26px;
      }

      > div:nth-child(2) {
        > button {
          display: block;
        }
      }
    }
  }
</style>
