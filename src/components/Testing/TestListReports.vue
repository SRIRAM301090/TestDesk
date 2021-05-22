<template>
  <div>
    <p class="text-h6 q-mt-md">Test ID : {{ testId.testID }}</p>
    <div class="q-mt-xl row">
      <div class=" col-2">
        <div class="q-mr-sm" style="max-width: 150px" v-if="testList.tests">
          <q-list bordered v-for="test in testList.tests" :key="test" dense>
            <q-item clickable v-ripple @click="getReport(test)" dense>
              <q-item-section avatar>
                <q-icon color="primary" name="double_arrow" />
              </q-item-section>

              <q-item-section>{{ test }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="col" style="border: 5px solid #1976D2;" v-if="report">
        <embed type="text/html" :src="report" width="700" height="700" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      report: ""
    };
  },
  computed: {
    ...mapGetters("test", ["currentTest"]),
    testList() {
      if (this.currentTest) {
        return { tests: this.currentTest.test["test"] };
      } else {
        return [];
      }
    },
    testId() {
      if (this.currentTest) {
        return { testID: this.currentTest.id };
      } else {
        return [];
      }
    }
  },
  methods: {
    getReport(test) {
      console.log(test);
      if (this.currentTest.test.result && test in this.currentTest.test.result) {
        this.report = this.currentTest.test.result[test].url;
      }
    }
  }
};
</script>
