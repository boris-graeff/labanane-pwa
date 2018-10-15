import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Playlist from './views/Playlist.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/playlist/:playlistId/:trackId?',
      name: 'playlist',
      component: Playlist,
      props: true
    }
  ]
})
