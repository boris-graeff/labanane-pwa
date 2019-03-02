<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <div>
      <h2>Authentication</h2>
      <p>Please enter playlist password</p>

      <div>
        <app-input label="Password" type="password" v-model="password" :error="error"/>
        <app-button type="submit">Go</app-button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'

export default {
  data () {
    return {
      password: '',
      error: ''
    }
  },
  watch: {
    password () {
      this.error = ''
    }
  },
  methods: {
    async onSubmit () {
      const { id, password } = this
      try {
        await this.checkPassword({ id, password })

        if (!this.isOwner) {
          this.error = 'Bad password ! :p'
        }
      } catch (e) {
        this.error = 'Oops something happened ! :S'
      }
    },
    ...mapActions('playlist', {
      checkPassword: 'checkPassword'
    })
  },
  computed: {
    ...mapState('playlist', {
      isOwner: ({ isOwner }) => isOwner,
      id: ({ id }) => id
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

  .auth-form {
    margin-top: 6px;
    padding-left: 20px;
    width: 100%;

    > div {
      padding: 20px 10px;
      background-color: rgba($wheat, .15);
    }

    p + div {
      display: flex;
      align-items: flex-start;
    }

    button {
      margin-top: 28px;
      margin-left: 12px;
    }
  }

</style>
