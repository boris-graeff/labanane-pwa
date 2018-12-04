<template>
  <div class="search">
    <h2>Add tracks</h2>

    <app-input label="Search by name" v-model="keywords" @input="onChange" />

    <div class="results">
      <app-list>
        <track-item v-for="track in results"
                    :key='track.provider+track.providerId'
                    :track="track"
                    draggable=true
                    @dragstart.native='onDragStart(track, $event)'
                    @click.native='addTrack({ track })'>
          {{ track.name }}
        </track-item>
      </app-list>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapState, mapActions } from 'vuex'
import AppInput from '@/components/AppInput'
import AppList from '@/components/AppList'
import TrackItem from '@/components/TrackItem'

export default {
  data () {
    return {
      keywords: ''
    }
  },
  computed: {
    ...mapState('search', {
      results: ({ results }) => results
    })
  },
  created () {
    this.reset()
  },
  methods: {
    onChange: debounce(function () {
      try {
        this.searchTracks(this.keywords)
      } catch (e) {
        // TODO handle error
      }
    }, 240),

    onDragStart (track, event) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('track', JSON.stringify(track))
    },

    ...mapActions({
      searchTracks: 'search/searchTracks',
      reset: 'search/reset',
      addTrack: 'playlist/addTrack'
    })
  },
  components: {
    AppInput,
    AppList,
    TrackItem
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .search {
    width: 100%;
    padding-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  .results {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    margin-right: -21px;
    padding-bottom: $player-height;
  }
</style>
