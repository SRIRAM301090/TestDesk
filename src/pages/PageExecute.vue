<template>
  <q-page padding>
    <div class="q-pa-md row" style="max-width: 500px">
      <q-select
        dense
        outlined
        v-model="selectedProject"
        :options="projects"
        label="Project"
        class="col"
        @input="setUserSelectedProject(selectedProject)"
      />
      <q-select
        dense
        outlined
        v-model="selectedProjectVariant"
        :options="projectVariants"
        label="Project Variant"
        class="col q-ml-md"
      />
      <q-btn
        dense
        color="primary"
        outline
        no-caps
        icon="file_download"
        label="Load"
        class="q-ml-md"
        @click="loadTestCase"
      />
    </div>
    <testcase-tree />
  </q-page>
</template>

<script>
import mixinScrollSections from "src/mixins/mixinScrollSections";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      selectedProject: null,
      selectedProjectVariant: null
    };
  },
  computed: { ...mapGetters("test", ["projects", "projectVariants"]) },
  mixins: [mixinScrollSections],
  components: {
    "testcase-tree": () => import("components/Testing/TestcaseTree.vue")
  },
  methods: {
    ...mapActions("test", [
      "getProjectLists",
      "fbReadData",
      "setUserSelectedProject",
      "getTestCase"
    ]),
    loadTestCase() {
      if (this.selectedProject && this.selectedProjectVariant) {
        this.getTestCase({
          project: this.selectedProject,
          projectVariant: this.selectedProjectVariant
        });
      }
    }
  },
  watch: {
    selectedProject(val) {
      if (val) this.selectedProjectVariant = "";
    }
  },
  mounted() {
    this.getProjectLists();
    this.fbReadData();
  }
};
</script>

<style></style>
