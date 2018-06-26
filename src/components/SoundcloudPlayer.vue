<template>
  <audio ref="player"
         crossorigin="anonymous"
         :src="trackUrl"/>
</template>

<script>
import constants from '@/constants.json'

const soundcloudApiKey = constants.SOUNDCLOUD_API_KEY

export default {
  props: ['track'],
  computed: {
    trackUrl () {
      const id = this.track.providerId
      return `https://api.soundcloud.com/tracks/${id}/stream?client_id=${soundcloudApiKey}`
    }
  }
}
</script>
