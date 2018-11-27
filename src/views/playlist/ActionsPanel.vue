<template>
  <div class="actions-panel">
    <div class="search">
      <h2>Add tracks</h2>

      <app-input label="Search by name" v-model="keywords" @input="onChange" />

      <app-list>
        <song-item v-for="song in results" :song="song">
          {{ song.name }}
        </song-item>
      </app-list>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapState, mapActions } from 'vuex'
import AppInput from '@/components/AppInput'
import AppList from '@/components/AppList'
import SongItem from '@/components/SongItem'

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
  methods: {
    onChange: debounce(function () {
      try {
        this.searchSongs(this.keywords)
      } catch (e) {
        // TODO handle error
      }
    }, 240),

    ...mapActions('search', {
      searchSongs: 'searchSongs'
    })
  },
  components: {
    AppInput,
    AppList,
    SongItem
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .actions-panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    h2 {
      font-size: 30px;
      font-weight: 300;
    }
  }

  .search {
    width: 100%;
    padding-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
</style>
