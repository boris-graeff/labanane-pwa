import { getAllPlaylists } from '@/api/app'

const SET_PLAYLISTS = 'SET_PLAYLISTS'

export default {
  namespaced: true,
  state: {
    playlists: []
  },

  mutations: {
    [SET_PLAYLISTS] (state, playlists) {
      state.playlists = playlists
    }
  },

  actions: {
    async getAll (store) {
      const playlists = await getAllPlaylists()
      store.commit(SET_PLAYLISTS, playlists)
    }
  }
}
