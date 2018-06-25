import axios from 'axios'

const client = axios.create({
  baseURL: 'https://labanane.no-ip.info/services'
})

export const createPlaylist = params => app.post('/playlists', params)

export const getAllPlaylists = () => app.get('/playlists')

export const getPlaylist = id => app.get(`/playlists/${id}`)

export const updatePlaylist = playlist => app.put('/playlists', playlist)

export const authenticate = params => app.post('/playlists/auth', params)
