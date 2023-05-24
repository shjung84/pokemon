<style lang="scss" scoped>
.spinner-wrawp {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
}
.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #e0e0e0;
  border-bottom: 5px solid #fe9616;
  animation: spin 1s linear infinite;
  position: relative;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<template lang="pug">
.spinner-wrap(ref="trigger")
  .spinner
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

export default {
  props: {},
  components: {},
  setup(props, { emit }) {
    const trigger = ref();
    const options = {
      root: null,
      threshold: 1,
    };
    let observer = null;
    const handleIntersect = entry => {
      if (entry.isIntersecting) emit("triggerIntersected", trigger.value);
    };

    onMounted(() => {
      try {
        observer = new IntersectionObserver(entries => {
          handleIntersect(entries[0]);
        }, options);
        observer.observe(trigger.value);
      } catch (err) {
        console.error(err);
      }
    });

    onUnmounted(() => {
      observer.value.disconnect();
    });

    return {
      trigger,
    };
  },
  data: () => {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
