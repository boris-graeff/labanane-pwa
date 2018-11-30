const SET_SHUFFLE_MODE = 'SET_SHUFFLE_MODE'
const SET_STATUS = 'SET_STATUS'
const SET_VOLUME = 'SET_VOLUME'
const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
const SET_SEEK_TO = 'SET_SEEK_TO'

export default {
  namespaced: true,
  state: {
    isShuffleMode: false,
    isPlaying: false,
    volume: 100,
    currentTime: 0,
    seekTo: 0
  },

  mutations: {
    [SET_SHUFFLE_MODE] (state, isShuffleMode) {
      state.isShuffleMode = isShuffleMode
    },
    [SET_STATUS] (state, isPlaying) {
      state.isPlaying = isPlaying
    },
    [SET_VOLUME] (state, volume) {
      state.volume = volume
    },
    [SET_CURRENT_TIME] (state, currentTime) {
      state.currentTime = currentTime
    },
    [SET_SEEK_TO] (state, value) {
      state.seekTo = value
    }
  },

  actions: {
    setShuffleMode (store, isShuffleMode) {
      store.commit(SET_SHUFFLE_MODE, isShuffleMode)
    },

    play (store) {
      store.commit(SET_STATUS, true)
    },

    pause (store) {
      store.commit(SET_STATUS, false)
    },

    setVolume (store, volume) {
      store.commit(SET_VOLUME, volume)
    },

    setCurrentTime (store, currentTime) {
      store.commit(SET_CURRENT_TIME, currentTime)
    },

    seekTo (store, value) {
      store.commit(SET_SEEK_TO, value)
    }
  }
}
