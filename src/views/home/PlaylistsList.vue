<template>
  <app-list class="playlists-list">
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
</template>

<script>
  import { mapState } from 'vuex';
  import AppList from '@/components/AppList.vue';

  export default {
    computed: {
      ...mapState('playlists', {
        playlists: ({ playlists }) => playlists
      })
    },
    components: {
      AppList
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/styles/constants.scss';

  .playlists-list {
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
