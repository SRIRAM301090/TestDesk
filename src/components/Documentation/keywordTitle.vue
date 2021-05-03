<template>
  <div>
  <h1 :class="'text-'+ size" class="text-primary scrollLink">{{ heading }}</h1>
  <hr v-if="hrLine">
  </div>
</template>

<script>
export default {
  props: ["heading", "size", "hrLine"],
};
</script>

<style></style>
