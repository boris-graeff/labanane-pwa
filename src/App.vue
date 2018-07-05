<template>
  <div id="app" class="app">
    <router-view/>
    <app-player v-show="track.id"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppPlayer from '@/components/AppPlayer'

export default {
  computed: {
    ...mapState('track', {
      track: ({ infos }) => infos
    })
  },
  components: {
    AppPlayer
  }
}
</script>

<style>
  @import '~@/styles/reset.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700');

</style>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .app {
    min-height: 100vh;
    font-family: 'Roboto Condensed', sans-serif;

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
