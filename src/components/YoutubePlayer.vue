<template>
  <div>
    Youtube player : {{ JSON.stringify(track) }}
  </div>
</template>

<script>
export default {
  props: ['track']
}
</script>
