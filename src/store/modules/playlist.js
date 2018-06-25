import { getPlaylist } from '@/api/app'

const SET_PLAYLIST = 'SET_PLAYLIST'

export default {
  namespaced: true,
  state: {
    playlist: {}
  },

  mutations: {
    [SET_PLAYLIST] (state, playlist) {
      state.playlist = playlist
    }
  },

  actions: {
    async getPlaylist (store, playlistId) {
      const playlist = await getPlaylist(playlistId)
      store.commit(SET_PLAYLIST, playlist)
    }
  }
}
