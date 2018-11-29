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

      <playlist-content class="playlist-content" />
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
  props: ['playlistId'],
  data () {
    return {
      isLoading: true,
      expandActionsPanel: false
    }
  },
  async created () {
    try {
      const { playlistId: id } = this
      await Promise.all([this.getPlaylist(id), this.checkPassword({ id })])
      this.expandActionsPanel = !this.tracks.length
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    ...mapState('playlist', {
      tracks: ({ tracks }) => tracks,
      isOwner: ({ isOwner }) => isOwner
    })
  },
  methods: {
    ...mapActions('playlist', {
      getPlaylist: 'getPlaylist',
      checkPassword: 'checkPassword'
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

  .actions-panel, .playlist-content {
    transition: width .2s ease-in-out, transform .2s ease-in-out;
    will-change: width;
  }

  .actions-panel {
    position: fixed;
    height: 100vh;
    width: 20%;
    left: 0;
    top: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0 6px;

    /deep/ h2 {
      font-size: 30px;
      font-weight: 300;
    }
  }

  .playlist-content {
    width: 80%;
  }
</style>
