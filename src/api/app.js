import client from './client'

const VUE_APP_API_BASE_URL = process.env.VUE_APP_API_BASE_URL

const app = client(`${VUE_APP_API_BASE_URL}/services`)

export const createPlaylist = (params) => app.post('/playlists', params)

export const getAllPlaylists = () => app.get('/playlists')

export const getPlaylist = (id) => app.get(`/playlists/${id}`)

export const updatePlaylist = (playlist) => app.put('/playlists', playlist)

export const authenticate = (params) => app.post('/playlists/auth', params)

export const getStreamUrl = id => `${VUE_APP_API_BASE_URL}/streams/${id}`
