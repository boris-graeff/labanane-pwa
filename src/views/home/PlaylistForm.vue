<template>
  <form @submit.prevent="onSubmit" class="playlist-form">

    <h2>Create your playlist now !</h2>
    <app-input type="text" v-model="name" label="Name" />
    <div>
      <app-input type="password" v-model="password" label="Password" />
      <app-button type="submit" class="button">Create</app-button>
    </div>
  </form>
</template>

<script>
  import AppInput from '@/components/AppInput';
  import AppButton from '@/components/AppButton';

  export default {
    data() {
      return {
        name: '',
        password: ''
      }
    },
    methods: {
      onSubmit() {
        console.log(this.name, this.password);
      }
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
    height: 40px;
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
