<template>
    <div class="home">
        <app-list>
            <li v-for="playlist in playlists" :key="playlist.id">
                <router-link :to="{name: 'playlist', params: { playlistId: playlist.id }}">
                    {{ playlist.name }}
                </router-link>
            </li>
        </app-list>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppList from '@/components/AppList'

export default {
  mounted () {
    this.getAllPlaylists()
  },
  computed: {
    ...mapState('playlists', {
      playlists: ({ playlists }) => playlists
    })
  },
  methods: {
    ...mapActions('playlists', {
      getAllPlaylists: 'getAll'
    })
  },
  components: {
    AppList
  }
}
</script>
