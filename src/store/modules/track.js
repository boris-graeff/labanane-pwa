import { getTrackUrl as getSoundcloudUrl } from '@/api/soundcloud'
import { getStreamUrl } from '@/api/app'

const SET_TRACK_INFOS = 'SET_TRACK_INFOS'

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
    }
  }
}
