<template>
  <q-page padding>
    <div class="row constrain" v-if="componentExists">
      <div class="col-12 col-sm-10 ">
        <component :is="id"></component>
      </div>
      <div class="row">
        <div class="aside-list col">Second column</div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageKeywords",
  data() {
    return {
      componentExists: false
    };
  },
  props: ["id"],
  components: {
    "wait": () => import("./keywordLists/Wait.vue"),
  },
  beforeMount() {
    this.componentExists = this.id in this.$options.components ? true : false;
    if (!this.componentExists) this.$router.replace("/404");
  },
  watch: {
    $route(val) {
      const keyword = val.params.id;
      this.componentExists = keyword in this.$options.components ? true : false;
      if (!this.componentExists) this.$router.replace("/404");
    }
  },

};
</script>

<style></style>
