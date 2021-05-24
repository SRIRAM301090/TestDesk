<template>
  <q-page padding class="constrain">
    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="testCase" label="Test Case" />
          <q-tab name="testBench" label="Test Bench" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated keep-alive>
          <q-tab-panel name="testCase">
            <test-project-select />
            <testcase-tree />
          </q-tab-panel>

          <q-tab-panel name="testBench">
            <test-bench-operations />
            <test-list-reports/>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import mixinScrollSections from "src/mixins/mixinScrollSections";

export default {
  name: "PageExecute",
  mixins: [mixinScrollSections],
  data() {
    return {
      splitterModel: 20,
      tab: "testCase",
    };
  },
  components: {
    "test-project-select": () =>
      import("components/Testing/TestProjectSelect.vue"),
    "testcase-tree": () => import("src/components/Testing/TestcaseTree.vue"),
    "test-bench-operations": () =>
      import("src/components/Testing/TestBenchOperations.vue"),
    "test-list-reports": () => import("components/Testing/TestListReports.vue")
  }
};
</script>

<style></style>
