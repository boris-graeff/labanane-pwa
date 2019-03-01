<template>
  <div class="input">
    <label>
      <span>{{ label }}</span>

      <input :type="type" :value="value" @input="$emit('input', $event.target.value)" />
      <div v-if="error" class="error">{{ error }}</div>
    </label>
  </div>
</template>

<script>
export default {
  props: ['label', 'type', 'value', 'error']
}
</script>

<style scoped lang="scss">
  @import '~@/styles/constants';

  .input {
    width: 100%;

    label {
      width: 100%;

      span {
        display: block;
        font-size: 14px;
        margin-bottom: 3px;
        margin-top: 10px;
      }
    }

    input {
      background: rgba($black, 0.05);
      border: 0;
      border-bottom: 2px solid rgba($black, 0.1);
      padding: $space-small;
      height: 40px;
      width: 100%;
    }
  }

  .error {
    padding: 10px;
    background-color: rgba($black, 0.2);
    font-size: 14px;
    margin-top: 3px;
  }
</style>
