<template>
<div class="playlist-content">
    <span>{{ playlistDuration | duration }}</span>
    <h1>{{ name }}</h1>

    <app-list  @dragover.prevent @drop='onDropEnd'>
      <tracklist-item v-for="(track, index) in tracks"
                      :key="track.id"
                      :index="index"
                      :track="track"
                      :class="{selected: track.id === currentTrack.id}"
                      @click="() => setTrack(track)" />
    </app-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AppList from '@/components/AppList'
import TracklistItem from './TracklistItem'

export default {
  computed: {
    ...mapState('playlist', {
      tracks: ({ tracks }) => tracks,
      name: ({ name }) => name
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
    ...mapActions({
      setTrack: 'track/setTrack',
      addTrack: 'playlist/addTrack'
    })
  },
  components: {
    AppList,
    TracklistItem
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .playlist-content {
    padding-top: 40px;
    padding-left: 60px;

    h1 {
      font-size: 40px;
      font-weight: 300;
    }
  }
</style>
