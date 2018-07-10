<template>
  <div class="playlist">
    <h1>{{ playlist.name }}</h1>
    <span>{{ playlistDuration | duration }}</span>
    <app-list>
      <li v-for="track in playlist.tracks"
          :key="track.id"
          :class="{selected: track.id === currentTrack.id}"
          @click="() => setTrack(track)">
        <div>{{ track.name }} - {{ track.provider }}</div>
      </li>
    </app-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AppList from '@/components/AppList'

export default {
  props: ['playlistId'],
  mounted () {
    this.getPlaylist(this.playlistId)
  },
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
    ...mapActions('playlist', {
      getPlaylist: 'getPlaylist'
    }),
    ...mapActions('track', {
      setTrack: 'setTrack'
    })
  },
  components: {
    AppList
  }
}
</script>
