<template>
  <q-page padding class="constrain">
    <div class="row">
      <div class="col-12 col-sm-6 q-pa-sm">
        <test-project-select />
        <testcase-tree />
      </div>

      <div class="col-12 col-sm-6 q-pa-sm">
        <test-bench-operations />
      </div>
    </div>
  </q-page>
</template>

<script>
import mixinScrollSections from "src/mixins/mixinScrollSections";

export default {
  mixins: [mixinScrollSections],
  data() {
    return {
      splitterModel: 20
    };
  },
  components: {
    "test-project-select": () =>
      import("components/Testing/TestProjectSelect.vue"),
    "testcase-tree": () => import("src/components/Testing/TestcaseTree.vue"),
    "test-bench-operations": () =>
      import("src/components/Testing/TestBenchOperations.vue")
  }
};
</script>

<style></style>
