<template>
  <q-page padding>
    <div class="row" v-if="componentExists">
      <div class="col-12 col-md-10">
        <component
          class="constrain"
          @getScrollSections="getScrollSection"
          :setScroll="currentScrollSection"
          :is="id"
        ></component>
      </div>
      <div class="col-md-2 fixed-right q-mt-xl">
        <keyword-sections
          :sections="kwdScrollSections"
          class="aside-list"
          @setScroll="scrollToSection"
        />
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
      kwdScrollSections: [],
      currentScrollSection: ""
    };
  },
  props: ["id"],
  components: {
    "keyword-sections": () =>
      import("components/Documentation/keywordSections.vue"),
    wait: () => import("src/pages/keywordLists/wait.vue")
  },
  methods: {
    getScrollSection(pos) {
      this.kwdScrollSections = pos;
    },
    scrollToSection(el) {
      this.currentScrollSection = el;
      setTimeout(() => {
        this.currentScrollSection = "";
      }, 1000);
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
