import Vuex from 'vuex'
import Vue from 'vue'
import playlists from './modules/playlists'
import playlist from './modules/playlist'
import track from './modules/track'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    playlists,
    playlist,
    track,
    search
  }
})
