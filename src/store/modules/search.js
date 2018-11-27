import levenshtein from 'levenshtein'
import { search as searchOnYoutube } from '@/api/youtube'
import { getPasswordFromLocalStorage } from '@/helpers/localStorage'

const SET_RESULTS = 'SET_RESULTS'

const youtubeSearch = async keywords => {
  const results = await searchOnYoutube(keywords)
  return results.data.items.map(track => ({
    providerId: track.id.videoId,
    name: track.snippet.title,
    provider: 'youtube',
    duration: 0,
    leven: levenshtein(track.snippet.title, keywords)
  }))
}

export default {
  namespaced: true,
  state: {
    results: []
  },

  mutations: {
    [SET_RESULTS] (state, results) {
      state.results = results
    }
  },

  actions: {
    async searchSongs(store, keywords) {
      if (!keywords.length) store.commit(SET_RESULTS, [])

      const results = await Promise.all([youtubeSearch(keywords)]);
      store.commit(SET_RESULTS, results.flat().sort((a, b) => a.leven - b.leven))
    }
  },

  getters: {
    getNextTrack: ({ playlist }) => (currentTrack, isShuffleMode) => {
      if (isShuffleMode) return playlist.tracks[getRandomIndex(playlist)]

      const currentIndex = getCurrentIndex(playlist, currentTrack.id)
      return playlist.tracks[getNextIndex(playlist, currentIndex)]
    },

    getPreviousTrack: ({ playlist }) => (currentTrack, isShuffleMode) => {
      if (isShuffleMode) return playlist.tracks[getRandomIndex(playlist)]

      const currentIndex = getCurrentIndex(playlist, currentTrack.id)
      return playlist.tracks[getPreviousIndex(playlist, currentIndex)]
    },

    duration: ({ playlist }) => {
      return playlist.tracks.reduce((total, track) => (track.duration || 0) + total, 0)
    }
  }
}
