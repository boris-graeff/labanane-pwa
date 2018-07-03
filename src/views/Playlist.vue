<template>
  <div class="playlist">
    <app-list>
      <li v-for="track in playlist.tracks"
          :key="track.id"
          :class="{selected: track.id === currentTrack.id}"
          @click="() => setTrack(track)">
        {{ track.name }} - {{ track.provider }}
      </li>
    </app-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
