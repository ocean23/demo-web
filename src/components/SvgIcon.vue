<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    props: {
      iconClass: {
        required: true,
        type: String,
      },
    },
    setup(props) {
      const iconName = computed(() => `#icon-${props.iconClass}`);
      return {
        iconName,
      };
    },
  });
</script>
<style lang="less" scoped>
  .svg-icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
