<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          TestDesk
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-tabs v-model="tab" no-caps dense>
        <q-tab name="reports" icon="summarize" label="Reports" />
        <q-tab name="execute" icon="play_arrow" label="Execute" />
        <q-tab name="keywords" icon="code" label="Keywords" />
        <q-tab name="settings" icon="settings" label="Settings" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Reports",
    caption: "View Test Reports",
    icon: "summarize",
    link: "reports"
  },
  {
    title: "Execute",
    caption: "Execute Testcase",
    icon: "play_arrow",
    link: "execute"
  },
  {
    title: "Keywords",
    caption: "Keyword Explorer",
    icon: "code",
    link: "keywords"
  },
  {
    title: "Settings",
    caption: "App Settings",
    icon: "settings",
    link: "settings"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      tab: 'mails'
    };
  }
};
</script>
