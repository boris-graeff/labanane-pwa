<template>
  <div class="playlist" :class="{expanded: expandActionsPanel}">
    <router-link :to="{ name: 'home'}" class='home'>
      <img src='~@/assets/labanane-logo.svg' alt="LaBanane"/>
    </router-link>

    <div class="content" v-if="!isLoading">

      <div class="actions-panel">
        <toggle-button @click.native="expandActionsPanel = !expandActionsPanel"
                       :on="expandActionsPanel" >
          <img src="~@/assets/icn-edit.svg" />
          <img src="~@/assets/icn-cross.svg" />
        </toggle-button>

        <track-search v-if="isOwner && expandActionsPanel" />

        <auth-form v-if="!isOwner && expandActionsPanel" />
      </div>

      <playlist-content class="playlist-content"
                        :expandActionsPanel="expandActionsPanel"
                        @toggleActionsPanel="expandActionsPanel = !expandActionsPanel"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ToggleButton from '@/components/ToggleButton'
import PlaylistContent from './playlist/PlaylistContent'
import TrackSearch from './playlist/TrackSearch'
import AuthForm from './playlist/AuthForm'

export default {
  props: ['playlistId', 'trackId'],
  data () {
    return {
      isLoading: true,
      expandActionsPanel: false
    }
  },
  async created () {
    try {
      const { playlistId: id, trackId } = this
      await Promise.all([this.getPlaylist(id), this.checkPassword({ id })])
      this.expandActionsPanel = !this.tracks.length

      document.title = this.name

      if (trackId) this.setTrack(this.tracks.find(track => track.id === trackId))
    } finally {
      this.isLoading = false
    }
  },
  watch: {
    'track.id' () {
      const { id } = this.track
      this.$router.replace({ name: 'playlist', params: { trackId: id } })
      document.title = this.track.name
    }
  },
  computed: {
    ...mapState('playlist', {
      tracks: ({ tracks }) => tracks,
      isOwner: ({ isOwner }) => isOwner,
      name: ({ name }) => name
    }),
    ...mapState('track', {
      track: ({ infos }) => infos
    })
  },
  methods: {
    ...mapActions({
      getPlaylist: 'playlist/getPlaylist',
      checkPassword: 'playlist/checkPassword',
      setTrack: 'track/setTrack'
    })
  },
  components: {
    PlaylistContent,
    TrackSearch,
    AuthForm,
    ToggleButton
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

    &.expanded {
      .actions-panel {
        width: 30%;
      }

      .playlist-content {
        width: 70%;
      }
    }
  }

  .home {
    position: fixed;
    top: $space-small;
    left: $space-small;
    width: 40px;
    height: 40px;
    transition: transform 300ms ease-in-out;
    z-index: 1;

    &:hover {
      transform: rotate(360deg);
    }
  }

  .content {
    display: flex;
    justify-content: flex-end;
    overflow-x: hidden;
    transition: opacity .2s ease-in-out;
  }

  .actions-panel, .playlist-content {
    transition: width .2s ease-in-out, transform .2s ease-in-out;
    will-change: width;
  }

  .actions-panel {
    position: fixed;
    height: 100vh;
    width: 20%;
    left: 0;
    top: 68px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 20px 6px 0;

    /deep/ h2 {
      font-size: 30px;
      font-weight: 300;
    }

    > button {
      position: absolute;
      top: 0;
      right: 6px;
    }
  }

  .playlist-content {
    width: 80%;
  }

  @media screen and (max-width: 600px) {
    .playlist, .playlist.expanded {
      .playlist-content {
        width: 100%;
        padding-left: 36px;
        transition: filter 300ms ease;
        will-change: filter;
      }

      .actions-panel {
        position: absolute;
        width: 100%;
        height: 100vh;
        background: linear-gradient(45deg, #FFAFBD 0%, #F4D03F 100%);
        z-index: 1;
        top: 0;
        left: 0;
        transform: translateX(-100%);
        will-change: transform;
        opacity: 0.9;
        transition: transform 300ms ease;
        padding-top: 40px;

        > button {
          top: 20px;
          right: 8px;
        }
      }
    }

    .playlist.expanded {
      .content {
        height: 100vh;
      }

      .playlist-content {
        filter: blur(3px);
      }

      .actions-panel {
        transform: translateX(0);
      }
    }
  }
</style>
