import axios from 'axios'

const VUE_APP_API_BASE_URL = process.env.VUE_APP_API_BASE_URL

const client = axios.create({
  baseURL: `${VUE_APP_API_BASE_URL}/services`
})

export const createPlaylist = params => client.post('/playlists', params)

export const getAllPlaylists = () => client.get('/playlists')

export const getPlaylist = id => client.get(`/playlists/${id}`)

export const updatePlaylist = playlist => client.put('/playlists', playlist)

export const checkPlaylistPassword = params => client.post('/playlists/auth', params)

export const getStreamUrl = id => `${VUE_APP_API_BASE_URL}/streams/${id}`
