<template>
  <div class="q-mt-md q-pa-sm row">
    <div class=" col">
      <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="positive" name="check_circle" />
            </q-item-section>

            <q-item-section>101</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="negative" name="clear" />
            </q-item-section>

            <q-item-section>102</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="play_arrow" />
            </q-item-section>

            <q-item-section>103</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="col">
      <p>Reports</p>
    </div>
  </div>
</template>
