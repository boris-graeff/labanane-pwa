<template>
<div class="playlist-content">
    <span>{{ playlistDuration | duration }}</span>
    <h1>{{ playlist.name }}</h1>

    <app-list>
      <tracklist-item v-for="(track, index) in playlist.tracks"
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
      playlist: ({ playlist }) => playlist
    }),
    ...mapState('track', {
      currentTrack: ({ infos }) => infos
    }),
    ...mapGetters('playlist', {
      playlistDuration: 'duration'
    })
  },
  methods: {
    ...mapActions('track', {
      setTrack: 'setTrack'
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
