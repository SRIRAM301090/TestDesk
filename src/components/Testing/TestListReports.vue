<template>
  <div class="q-mt-md row">
    <div class=" col-md-2">
      <div class="q-mr-sm" style="max-width: 250px">
        <q-list bordered v-for="test in tests" :key="test">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="double_arrow" />
            </q-item-section>

            <q-item-section>{{ test }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="col-md-10">
      <p>Sample</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("test", ["tests"])
  }
};
</script>
