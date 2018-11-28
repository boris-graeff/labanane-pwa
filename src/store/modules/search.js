import levenshtein from 'levenshtein'
import { search as searchOnYoutube } from '@/api/youtube'
import { search as searchOnSoundcloud } from '@/api/soundcloud'

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

const soundcloudSearch = async keywords => {
  const results = await searchOnSoundcloud(keywords)
  return results.data.map(track => ({
    providerId: track.id,
    name: track.title,
    provider: 'soundcloud',
    artwork: track.artwork_url,
    duration: track.duration,
    leven: levenshtein(track.title, keywords)
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
    async searchTracks (store, keywords) {
      if (!keywords.length) store.commit(SET_RESULTS, [])

      const results = await Promise.all([youtubeSearch(keywords), soundcloudSearch(keywords)])
      store.commit(SET_RESULTS, results.flat().sort((a, b) => a.leven - b.leven))
    }
  }
}
