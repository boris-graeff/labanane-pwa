import { getPlaylist, checkPlaylistPassword } from '@/api/app'
import {getPasswordFromLocalStorage} from "../../helpers/localStorage";

const SET_PLAYLIST = 'SET_PLAYLIST'
const IS_PLAYLIST_OWNER = 'IS_PLAYLIST_OWNER'

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
      tracks: [],
      isOwner: false,
      password: ''
    }
  },

  mutations: {
    [SET_PLAYLIST] (state, playlist) {
      state.playlist = playlist
    },
    [IS_PLAYLIST_OWNER] (state, password) {
      state.isOwner = true
      state.password = password
    }
  },

  actions: {
    async getPlaylist (store, id) {
      const { data } = await getPlaylist(id)
      store.commit(SET_PLAYLIST, data)
    },
    async checkPassword (store, id) {
      const password = getPasswordFromLocalStorage(id)
      await checkPlaylistPassword({ id, password })
      store.commit(IS_PLAYLIST_OWNER, password)
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
