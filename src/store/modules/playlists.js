import { getAllPlaylists } from '@/api/app'

const SET_PLAYLISTS = 'SET_PLAYLISTS'

export default {
  namespaced: true,
  state: {
    playlists: []
  },

  mutations: {
    [SET_PLAYLISTS] (state, playlists) {
      console.log('toto')
      state.playlists = playlists
    }
  },

  actions: {
    async getAll (store) {
      const playlists = await getAllPlaylists()
      console.log('tata')
      store.commit(SET_PLAYLISTS, playlists)
    }
  }
}
