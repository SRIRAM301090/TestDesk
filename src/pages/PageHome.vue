<template>
  <q-page padding>
    <div class="constrain">
      <div>
        <h1 class="text-h2 text-weight-medium q-mb-md text-primary">TestDesk</h1>
        <h1 class="text-h5">Cloud based approach for Test Automation</h1>
      </div>

      <q-banner class="bg-green-6 text-white q-my-xl">
        <span class="text-h5">Are you ready to get started</span>
        <template v-slot:action>
          <q-btn flat color="white" label="Execute" to="/execute" />
          <q-btn flat color="white" label="Reports" to="/reports" />
        </template>
      </q-banner>

      <div class="row items-start q-gutter-sm ">
        <div class="col-12 col-md-4  text-center q-ma-none q-pa-md ">
          <q-icon name="cloud_done" size="48px" class="text-green" />
          <h4>Execute Tests</h4>
          <p>
            Load Projetcs, Select Testcases and Execute test
          </p>
        </div>

        <div class="col-12 col-md-4 text-center q-ma-none q-pa-md">
          <q-icon name="assignment_turned_in" size="48px" class="text-green" />
          <h4>View Reports</h4>
          <p>
            View Test Reports instantly post execution or later
          </p>
        </div>

        <div class="col-12 col-md-4  text-center q-ma-none q-pa-md">
          <q-icon
            name="integration_instructions"
            size="48px"
            class="text-green"
          />
          <h4>Documentation</h4>
          <p>
            Learn the Keywords for Testcase Development
          </p>
        </div>

        <div class="col-12 col-md-4  text-center q-ma-none q-pa-md">
          <q-icon name="verified_user" size="48px" class="text-green" />
          <h4>Security</h4>
          <p>
            Built on a Secured platform. Your Test Data's are safe.
          </p>
        </div>

        <div class="col-12 col-md-4  text-center q-ma-none q-pa-md">
          <q-icon name="insights" size="48px" class="text-green" />
          <h4>Analytics</h4>
          <p>
            Gain some Insights on the collected Test's Data
          </p>
        </div>

        <div class="col-12 col-md-4  text-center q-ma-none q-pa-md">
          <q-icon name="help_outline" size="48px" class="text-green" />
          <h4>Help</h4>
          <p>
            Feel free to reach to us for any support or to implement new features
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import mixinScrollSections from "src/mixins/mixinScrollSections";

export default {
  name: "PageIndex",
  mixins: [mixinScrollSections],
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
