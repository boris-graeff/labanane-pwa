<template>
  <div class="playlist">
    <router-link :to="{ name: 'home'}" class='home'>
      <img src='/img/labanane-logo.svg' alt="LaBanane logo"/>
    </router-link>

    <div class="content">

      <actions-panel class="actions-panel"/>

      <div class="tracklist">
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
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AppList from '@/components/AppList'
import TracklistItem from '@/components/TracklistItem'
import ActionsPanel from './playlist/ActionsPanel'

export default {
  props: ['playlistId'],
  mounted () {
    this.getPlaylist(this.playlistId)
    this.checkPassword(this.playlistId)
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
      getPlaylist: 'getPlaylist',
      checkPassword: 'checkPassword'
    }),
    ...mapActions('track', {
      setTrack: 'setTrack'
    })
  },
  components: {
    AppList,
    TracklistItem,
    ActionsPanel
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .playlist {

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

  .home {
    position: fixed;
    top: 6px;
    left: 6px;
    width: 40px;
    height: 40px;
  }

  .content {
    display: flex;
    justify-content: flex-end;
    overflow-x: hidden;
    transition: opacity .2s ease-in-out;
  }

  .actions-panel, .tracklist {
    transition: width .2s ease-in-out, transform .2s ease-in-out;
    will-change: width;
  }

  .actions-panel {
    position: fixed;
    height: 100vh;
    width: 30%;
    left: 0;
    top: 60px;
  }

  .tracklist {
    width: 70%;
    position: relative;
    background-color: rgba($wheat, .15);
    min-height: 100vh;
  }
</style>
