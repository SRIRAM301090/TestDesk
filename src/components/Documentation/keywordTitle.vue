<template>
  <div class="scrollLink">
  <h1 :class="'text-'+ size" class="text-primary">{{ heading }}</h1>
  <hr v-if="hrLine">
  </div>
</template>

<script>
export default {
  props: ["heading", "size", "hrLine"],
};
</script>

<style></style>
