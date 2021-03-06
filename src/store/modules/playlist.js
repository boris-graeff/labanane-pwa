import moment from 'moment'
import { cloneDeep } from 'lodash'
import { getPlaylist, checkPlaylistPassword, updatePlaylist } from '@/api/app'
import { getVideoDetails } from '@/api/youtube'
import { getPasswordFromLocalStorage, savePasswordInLocalStorage } from '@/helpers/localStorage'

const SET_PLAYLIST = 'SET_PLAYLIST'
const IS_PLAYLIST_OWNER = 'IS_PLAYLIST_OWNER'
const ADD_TRACK = 'ADD_TRACK'
const REMOVE_TRACK = 'REMOVE_TRACK'
const MOVE_TRACK = 'MOVE_TRACK'
const SET_TRACK_ERROR = 'SET_TRACK_ERROR'

const getCurrentIndex = (tracks, currentTrackId) =>
  tracks.findIndex(track => track.id === currentTrackId)

const getRandomIndex = tracks => Math.floor(Math.random() * tracks.length)

const getNextIndex = (tracks, currentIndex) => {
  const nextIndex = currentIndex + 1
  return nextIndex >= tracks.length ? 0 : nextIndex
}

const getPreviousIndex = (tracks, currentIndex) => {
  const previousIndex = currentIndex - 1
  return previousIndex < 0 ? (tracks.length - 1) : previousIndex
}

export default {
  namespaced: true,
  state: {
    id: '',
    name: '',
    tracks: [],
    isOwner: false,
    password: ''
  },

  mutations: {
    [SET_PLAYLIST] (state, { id, tracks, name }) {
      state.tracks = tracks
      state.name = name
      state.id = id
    },
    [IS_PLAYLIST_OWNER] (state, { password, isOwner }) {
      state.isOwner = isOwner
      state.password = password
    },
    [ADD_TRACK] (state, { track, index }) {
      track.id = Date.now()

      if (index !== undefined) state.tracks.splice(index, 0, track)
      else state.tracks.push(track)
    },
    [REMOVE_TRACK] (state, index) {
      state.tracks.splice(index, 1)
    },
    [MOVE_TRACK] (state, { track, index }) {
      state.tracks.splice(track.index, 1)

      if (index !== undefined) state.tracks.splice(index, 0, track)
      else state.tracks.push(track)
    },
    [SET_TRACK_ERROR] (state, track) {
      const index = state.tracks.findIndex(t => t.id === track.id)
      state.tracks[index] = { error: true, ...track }
    }
  },

  actions: {
    async getPlaylist (store, id) {
      const { data } = await getPlaylist(id)
      store.commit(SET_PLAYLIST, { id, ...data })
    },

    async checkPassword (store, { id, password }) {
      if (!password) password = getPasswordFromLocalStorage(id)

      const { data: isOwner } = await checkPlaylistPassword({ id, password })
      store.commit(IS_PLAYLIST_OWNER, { isOwner, password })

      if (isOwner) savePasswordInLocalStorage(id, password)
    },

    async addTrack (store, { track, index }) {
      const clonedTrack = cloneDeep(track)

      if (clonedTrack.provider === 'youtube') {
        const { data } = await getVideoDetails(clonedTrack.providerId)
        const duration = data.items[0].contentDetails.duration
        clonedTrack.duration = moment.duration(duration).asMilliseconds()
      }

      store.commit(ADD_TRACK, { track: clonedTrack, index })
      updatePlaylist(store.state)
    },

    async removeTrack (store, index) {
      const trackToRemove = store.state.tracks[index]
      const currentSelectedTrack = store.rootState.track.infos
      if (trackToRemove.id === currentSelectedTrack.id) {
        store.dispatch('track/setNextTrack', null, { root: true })
      }
      store.commit(REMOVE_TRACK, index)
      updatePlaylist(store.state)
    },

    moveTrack (store, { track, index }) {
      store.commit(MOVE_TRACK, { track, index })
    },

    setTrackError (store) {
      const track = store.rootState.track.infos
      store.commit(SET_TRACK_ERROR, track)
    }
  },

  getters: {
    getNextTrack: ({ tracks }, getters, rootState) => currentTrack => {
      const { isShuffleMode } = rootState.player
      if (isShuffleMode) return tracks[getRandomIndex(tracks)]

      const currentIndex = getCurrentIndex(tracks, currentTrack.id)
      return tracks[getNextIndex(tracks, currentIndex)]
    },

    getPreviousTrack: ({ tracks }, getters, rootState) => (currentTrack) => {
      const { isShuffleMode } = rootState.player
      if (isShuffleMode) return tracks[getRandomIndex(tracks)]

      const currentIndex = getCurrentIndex(tracks, currentTrack.id)
      return tracks[getPreviousIndex(tracks, currentIndex)]
    },

    duration: ({ tracks }) => {
      return tracks.reduce((total, track) => (track.duration || 0) + total, 0)
    }
  }
}
