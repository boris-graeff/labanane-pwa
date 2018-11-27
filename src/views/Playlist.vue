<template>
  <div class="playlist">
    <router-link :to="{ name: 'home'}" class='home'>
      <img src='/img/labanane-logo.svg' alt="LaBanane logo"/>
    </router-link>

    <div class="content">

      <actions-panel class="actions-panel"/>

      <playlist-content class="playlist-content" />

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ActionsPanel from './playlist/ActionsPanel'
import PlaylistContent from './playlist/PlaylistContent'

export default {
  props: ['playlistId'],
  mounted () {
    this.getPlaylist(this.playlistId)
    this.checkPassword(this.playlistId)
  },
  methods: {
    ...mapActions('playlist', {
      getPlaylist: 'getPlaylist',
      checkPassword: 'checkPassword'
    })
  },
  components: {
    ActionsPanel,
    PlaylistContent
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

  .actions-panel, .playlist-content {
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

  .playlist-content {
    width: 70%;
    position: relative;
    background-color: rgba($wheat, .15);
    min-height: 100vh;
  }
</style>
