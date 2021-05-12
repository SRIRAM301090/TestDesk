<template>
  <div class= "row q-mt-md" style="max-width: 450px">
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
      style="width: 70px"
      color="primary"
      outline
      no-caps
      label="Load"
      class="q-ml-md"
      @click="loadTestCase"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      selectedProject: "",
      selectedProjectVariant: ""
    };
  },
  computed: { ...mapGetters("test", ["projects", "projectVariants"]) },
  methods: {
    ...mapActions("test", [
      "getProjectLists",
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
  }
};
</script>

<style></style>
