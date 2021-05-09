<template>
  <q-page padding>
    <div class="row" v-if="componentExists">
      <div class="col-12">
        <component class="constrain" :is="id"></component>
      </div>
    </div>
  </q-page>
</template>

<script>
import mixinScrollSections from "src/mixins/mixinScrollSections";

export default {
  name: "PageKeywords",
  data() {
    return {
      componentExists: false
    };
  },
  mixins: [mixinScrollSections],
  props: ["id"],
  components: {
    wait: () => import("src/pages/keywordLists/WaitTimer.vue"),
    snap: () => import("src/pages/keywordLists/SnapImage.vue")
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
  }
};
</script>

<style></style>
