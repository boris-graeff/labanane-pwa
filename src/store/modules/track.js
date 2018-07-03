import { getTrackUrl as getSoundcloudUrl } from '@/api/soundcloud'
import { getTrackUrl as getYoutubeUrl } from '@/api/youtube'

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
      const url = provider === 'youtube' ? getYoutubeUrl(providerId) : getSoundcloudUrl(providerId)
      state.infos = { ...track, url }
    }
  },

  actions: {
    async setTrack (store, track) {
      store.commit(SET_TRACK_INFOS, track)
    }
  }
}
