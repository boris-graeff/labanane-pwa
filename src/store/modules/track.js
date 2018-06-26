const SET_TRACK_INFOS = 'SET_TRACK_INFOS'

export default {
  namespaced: true,
  state: {
    infos: {
      id: 'id'
    }
  },

  mutations: {
    [SET_TRACK_INFOS] (state, track) {
      state.infos = track
    }
  },

  actions: {
    async setTrack (store, track) {
      store.commit(SET_TRACK_INFOS, track)
    }
  }
}
