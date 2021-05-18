<template>
  <q-page padding>
    <div class="row constrain">
      <div>
        <report-table />
      </div>
      <div>
        <report-table />
      </div>
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
