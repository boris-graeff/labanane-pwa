<template>
  <div class="playlist">
    <div>
      <router-link :to="{ name: 'home'}" class='home'>
        <img src='/img/labanane-logo.svg' alt="LaBanane logo"/>
      </router-link>
    </div>

    <div>
      <span>{{ playlistDuration | duration }}</span>
      <h1>{{ playlist.name }}</h1>

      <app-list class="tracklist">
        <tracklist-item v-for="(track, index) in playlist.tracks"
               :key="track.id"
               :index="index"
               :track="track"
               :class="{selected: track.id === currentTrack.id}"
               @click="() => setTrack(track)" />
      </app-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AppList from '@/components/AppList'
import TracklistItem from '@/components/TracklistItem'

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
    AppList,
    TracklistItem
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .playlist {
    padding-left: $space-big;
    padding-top: $space-small;

    h1 {
      font-weight: 300;
    }

    > div:first-child {
      display: flex;
      align-items: center;
      margin-left: -$space-small;

      img {
        margin-right: $space-small;
      }
    }
  }

  .tracklist {
    min-height: 100vh;
  }

  .home {
    width: 40px;
    height: 40px;
  }
</style>
