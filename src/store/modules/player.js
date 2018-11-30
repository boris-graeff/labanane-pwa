const SET_SHUFFLE_MODE = 'SET_SHUFFLE_MODE'

export default {
  namespaced: true,
  state: {
    isShuffleMode: false
  },

  mutations: {
    [SET_SHUFFLE_MODE] (state, isShuffleMode) {
      state.isShuffleMode = isShuffleMode
    }
  },

  actions: {
    async setShuffleMode (store, isShuffleMode) {
      store.commit(SET_SHUFFLE_MODE, isShuffleMode)
    }
  }
}
