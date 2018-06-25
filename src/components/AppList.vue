<template>
    <ul class='list'>
        <slot></slot>
    </ul>
</template>

<script>
export default {
  name: 'list'
}
</script>

<style scoped lang='scss'>
    @import '~@/styles/constants';

    .list {
        padding: 0;
        background: url("~@/assets/tracks-background.svg");

        > li {
            position: relative;
            height: 30px;
            line-height: 30px;
            transition: background 300ms ease-in-out, color 300ms ease-in-out;
            cursor: pointer;

            &:hover {
                background-color: rgba($wheat, 0.8);
            }

            > * {
              padding: 0 6px;
              display: block;
            }
        }
    }
</style>
