<template>
    <div class="home">
      <div class="main">
        <div>
          <header>
            <h1>
              <img src="~@/assets/labanane-title.svg" alt="LaBanane" title="LaBanane">
            </h1>
            <p>
              Welcome to LaBanane, the application for sharing and listening to your favorite music !<br>
              Join us on Facebook to be informed of last news, share your playlist or report a problem.
            </p>
          </header>
          <playlist-form />
        </div>
      </div>
      <div class="playlists">
        <div class="scroll-container">
          <playlists-list />
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import PlaylistForm from './home/PlaylistForm'
import PlaylistsList from './home/PlaylistsList'

export default {
  mounted () {
    this.getAllPlaylists()
  },
  methods: {
    ...mapActions('playlists', {
      getAllPlaylists: 'getAll'
    })
  },
  components: {
    PlaylistForm,
    PlaylistsList
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .home {
    display: flex;
  }

  .main {
    height: 100vh;
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > div {
      max-width: 600px;
      padding: $space-medium;
    }

    h1 {
      transform: translateX(-30px);
      margin-bottom: $space-medium;
    }

    header {
      margin-bottom: $space-medium;
    }
  }

  .playlists {
    height: 100vh;
    width: 40%;
    padding-bottom: $player-height;
  }

  .scroll-container {
    height: 100%;
    overflow-y: visible;
    overflow-x: hidden;
  }

  @media screen and (max-width: 800px) {
    .home {
      flex-direction: column;
    }

    .main {
      height: auto;
      width: 100%;
    }

    .playlists {
      width: 100%;
      height: auto;
      margin-top: $space-big;
    }
  }
</style>
