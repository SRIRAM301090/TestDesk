<template>
  <q-page padding>
    <div class="constrain">
      <report-table />
    </div>
  </q-page>
</template>

<script>
import mixinScrollSections from "src/mixins/mixinScrollSections";

export default {
  mixins: [mixinScrollSections],
  components: {
    "report-table": () => import("src/components/Report/ReportTable.vue")
  }
};
</script>

<style></style>
