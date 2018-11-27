import { getPlaylist } from '@/api/app'

const SET_PLAYLIST = 'SET_PLAYLIST'

const getCurrentIndex = (playlist, currentTrackId) =>
  playlist.tracks.findIndex(track => track.id === currentTrackId)

const getRandomIndex = playlist => Math.floor(Math.random() * playlist.tracks.length)

const getNextIndex = (playlist, currentIndex) => {
  const nextIndex = currentIndex + 1
  return nextIndex >= playlist.tracks.length ? 0 : nextIndex
}

const getPreviousIndex = (playlist, currentIndex) => {
  const previousIndex = currentIndex - 1
  return previousIndex < 0 ? (playlist.tracks.length - 1) : previousIndex
}

export default {
  namespaced: true,
  state: {
    playlist: {
      tracks: []
    }
  },

  mutations: {
    [SET_PLAYLIST] (state, playlist) {
      state.playlist = playlist
    }
  },

  actions: {
    async getPlaylist (store, playlistId) {
      const { data } = await getPlaylist(playlistId)
      store.commit(SET_PLAYLIST, data)
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
