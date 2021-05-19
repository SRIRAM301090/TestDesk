<template>
  <div class="q-mt-md row">
    <div class=" col-2">
      <div class="q-mr-sm" style="max-width: 150px">
        <q-list bordered v-for="test in tests" :key="test">
          <q-item clickable v-ripple @click="getReport(test)">
            <q-item-section avatar>
              <q-icon color="primary" name="double_arrow" />
            </q-item-section>

            <q-item-section>{{ test }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="col" style="border-left: 5px solid #1976D2;">
      <embed
        v-if="report"
        type="text/html"
        :src="report"
        width="700"
        height="700"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return { report: "", tests: [] };
  },
  computed: {
    ...mapGetters("test", ["currentTest"])
  },
  methods: {
    getReport(test) {
      if (this.currentTest.result && test in this.currentTest.result) {
        this.report = this.currentTest.result[test].url;
      }
    }
  },
  watch: {
    currentTest: {
      handler(val) {
        if (!(val in this.currentTest)) {
          this.report = "";
        }
        if (val) {
          this.tests = this.currentTest["test"];
        }
      },
      deep: true
    }
  }
};
</script>
