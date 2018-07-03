import constants from '@/constants.json'

const soundcloudApiKey = constants.SOUNDCLOUD_API_KEY

export const getTrackUrl = trackId => `https://api.soundcloud.com/tracks/${trackId}/stream?client_id=${soundcloudApiKey}`
