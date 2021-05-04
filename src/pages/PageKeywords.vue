<template>
  <q-page padding>
    <div class="row" v-if="componentExists">
      <div class="col-12 col-md-10">
        <component
          class="constrain"
          @getScrollSections="setScrollSection"
          :is="id"
        ></component>
      </div>
      <div class="col-md-2">
        <keyword-sections :sections="scrollSection" class="aside-list"
          >Second column</keyword-sections
        >
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageKeywords",
  data() {
    return {
      componentExists: false,
      scrollSection: []
    };
  },
  props: ["id"],
  components: {
    "keyword-sections": () =>
      import("components/Documentation/keywordSections.vue"),
    wait: () => import("src/pages/keywordLists/wait.vue")
  },
  methods: {
    setScrollSection(pos) {
      this.scrollSection = pos;
    }
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
