import { getTrackUrl as getSoundcloudUrl } from '@/api/soundcloud'
import { getStreamUrl } from '@/api/app'

const SET_TRACK_INFOS = 'SET_TRACK_INFOS'
const SET_TRACK_DURATION = 'SET_TRACK_DURATION'

export default {
  namespaced: true,
  state: {
    infos: {
      id: ''
    }
  },

  mutations: {
    [SET_TRACK_INFOS] (state, track) {
      const { provider, providerId } = track
      const url = provider === 'youtube' ? getStreamUrl(providerId) : getSoundcloudUrl(providerId)
      state.infos = { ...track, url }
    },
    // Handle old playlists
    [SET_TRACK_DURATION] (state, duration) {
      state.infos.duration = duration
    }
  },

  actions: {
    async setTrack ({ commit }, track) {
      commit(SET_TRACK_INFOS, track)
    },

    setNextTrack (store) {
      const { isShuffleMode } = store.rootState.player
      const nextTrack = store.rootGetters['playlist/getNextTrack'](store.state.infos, isShuffleMode)
      store.commit(SET_TRACK_INFOS, nextTrack)
    },

    setPreviousTrack (store) {
      const { isShuffleMode } = store.rootState.player
      const previousTrack = store.rootGetters['playlist/getPreviousTrack'](store.state.infos, isShuffleMode)
      store.commit(SET_TRACK_INFOS, previousTrack)
    },

    // Handle old playlists
    setTrackDuration (store, duration) {
      store.commit(SET_TRACK_DURATION, duration)
    }
  }
}
