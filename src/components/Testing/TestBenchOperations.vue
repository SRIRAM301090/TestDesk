<template>
  <div class="q-mt-md row">
    <div class="q-gutter-y-md" style="width: 600px;">
      <q-card style="height: 500px">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="testcase" label="Test Case" />
          <q-tab name="testresult" label="Test Result" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="testcase">
            <div class="text-h6">TestCase</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
              dicta deleniti voluptas facere quibusdam iusto porro. Ipsam sed
              quaerat iusto fugiat facilis ab, saepe ipsum ex eos, praesentium
              rerum quam?
            </p>
          </q-tab-panel>

          <q-tab-panel name="testresult">
            <div class="text-h6">Test Result</div>
            <div class="row">
              <q-select
                class="col"
                dense
                outlined
                v-model="testBench"
                :options="bench"
                label="Bench Id"
              />
              <q-select
                dense
                outlined
                v-model="testCommand"
                label="Command"
                class="col q-ml-md"
                :options="command"
                :disable="!testBench"
              />
              <q-btn
                dense
                style="width: 70px"
                color="primary"
                outline
                no-caps
                label="Send"
                class="q-ml-md"
                @click="submit"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tab: "testresult",
      testBench: null,
      testCommand: null,
      bench: ["CHE7-L26526", "CHE7-W10142"],
      command: ["Self-Test", "Start-Test"]
    };
  },
  methods: {
    ...mapActions("test", ["sendCommand"]),
    submit() {
      this.sendCommand({
        testBench: this.testBench,
        testCommand: this.testCommand
      });
    }
  }
};
</script>

<style></style>
