<template>
  <form @submit.prevent="onSubmit" class="playlist-form">

    <h2>Create your playlist now !</h2>
    <app-input type="text" :value="name" @input="slugifyName" label="Name" />
    <div>
      <app-input type="password" v-model="password" label="Password" />
      <app-button type="submit" class="button">Create</app-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import { slugify } from '@/helpers/strings'

export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    async onSubmit () {
      const { name, password } = this

      try {
        const playlistId = await this.createPlaylist({ name, password })
        this.$router.push({ name: 'playlist', params: { playlistId } })
      } catch (e) {
        // TODO handle error
      }
    },
    slugifyName (name) {
      this.name = slugify(name)
    },
    ...mapActions('playlists', {
      createPlaylist: 'create'
    })
  },
  components: {
    AppInput,
    AppButton
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .playlist-form {
    max-width: 410px;

    > div {
      display: flex;
      align-items: flex-end;
    }

    h2 {
      font-size: 30px;
      font-style: italic;
      font-weight: 700;
      margin-bottom: $space-small;
    }
  }

  .button {
    min-width: 200px;
    margin-left: $space-medium;
  }

  @media screen and (max-width: 440px) {
    .playlist-form > div {
      display: block;
    }

    .button {
      width: 100%;
      margin-left: 0;
      margin-top: $space-big;
    }
  }
</style>
