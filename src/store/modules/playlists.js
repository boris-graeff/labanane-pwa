import { getAllPlaylists, createPlaylist } from '@/api/app'
import { savePasswordInLocalStorage } from '@/helpers/localStorage'

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
    async getAll ({ commit }) {
      const { data }= await getAllPlaylists()
      commit(SET_PLAYLISTS, data.sort((a, b) => b.timestamp - a.timestamp))
    },
    async create ({ commit }, payload) {
      const { data } = await createPlaylist(payload)
      const { id } = data
      savePasswordInLocalStorage(id, payload.password)
      return id
    }
  }
}
