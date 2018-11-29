<template>
  <form @submit.prevent="onSubmit">
    <h2>Authentication</h2>
    <p>Please enter playlist password</p>

    <div>
      <app-input label="Password" type="password" v-model="password" />
      <button type="button">Go</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import AppInput from '@/components/AppInput'

export default {
  data () {
    return {
      password: ''
    }
  },
  methods: {
    ...mapActions({

    })
  },
  components: {
    AppInput
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

</style>
