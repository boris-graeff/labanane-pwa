<template>
    <div class="home">
      <h1>LaBanane</h1>
      <app-player />
      <app-list class="playlists">
        <li v-for="playlist in playlists" :key="playlist.id">
          <router-link :to="{name: 'playlist', params: { playlistId: playlist.id }}">
            <span>
              {{ playlist.name }}
            </span>
            <span>
              {{ playlist.length }}
            </span>
          </router-link>
        </li>
      </app-list>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppList from '@/components/AppList'
import AppPlayer from '@/components/AppPlayer'

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
    AppList,
    AppPlayer
  }
}
</script>

<style scoped lang="scss">
  .playlists {
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
