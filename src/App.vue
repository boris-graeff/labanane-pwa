<template>
  <div id="app" class="app">
    <div>
      <router-view />
    </div>
    <app-player />
    <players-manager />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppPlayer from '@/components/AppPlayer'
import PlayersManager from '@/components/PlayersManager'

export default {
  computed: {
    ...mapState('app', {
      isDesktopBrowser: ({ isDesktopBrowser }) => isDesktopBrowser
    })
  },
  components: {
    AppPlayer,
    PlayersManager
  }
}
</script>

<style>
  @import '~@/styles/reset.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700');

</style>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .app {
    min-height: 100vh;
    font-family: 'Roboto Condensed', sans-serif;
    color: $black;

    &:before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: $banana-gradient;
      z-index: -1;
    }
  }
</style>
