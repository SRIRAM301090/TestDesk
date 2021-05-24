<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          class="large-screen-only"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <span class="absolute-center">
            <q-btn to="/" flat no-caps size="1.5rem">
              <q-avatar size="3rem">
                <img src="~assets/Iconheader.png" />
              </q-avatar>
              <span class="q-ml-sm">TestDesk</span>
            </q-btn>
          </span>
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          class="absolute-right"
          flat
          icon-right="account_circle"
          label="Login"
        />

        <q-btn
          @click="logoutUser"
          v-else
          class="absolute-right"
          flat
          icon-right="account_circle"
          label="Logout"
        />
      </q-toolbar>
    </q-header>

    <q-footer elevated class="small-screen-only">
      <q-tabs v-model="tab" no-caps dense>
        <q-route-tab
          name="reports"
          to="/reports"
          icon="summarize"
          label="Reports"
        />
        <q-route-tab
          name="keywords"
          to="/keywords"
          icon="code"
          label="Keywords"
        />
        <q-route-tab
          name="settings"
          to="/settings"
          icon="settings"
          label="Settings"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      class="large-screen-only"
      show-if-above
      side="left"
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

    <q-drawer
      show-if-above
      v-model="right"
      side="right"
      class="large-screen-only"
      content-class="bg-grey-1"
    >
      <ScrollSectionLists />
    </q-drawer>

    <q-page-container>
      <keep-alive :include="['PageExecute']">
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import ScrollSectionLists from "components/shared/ScrollSectionLists.vue";
import { mapState, mapActions } from "vuex";

const linksData = [
  {
    title: "Reports",
    caption: "View Test Reports",
    icon: "summarize",
    link: "/reports"
  },
  {
    title: "Execute",
    caption: "Execute Testcase",
    icon: "play_arrow",
    link: "/execute"
  },
  {
    title: "Keywords",
    caption: "Keyword Explorer",
    icon: "code",
    link: "/keywords"
  },
  {
    title: "Settings",
    caption: "App Settings",
    icon: "settings",
    link: "/settings"
  }
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
    ScrollSectionLists
  },
  data() {
    return {
      leftDrawerOpen: false,
      right: true,
      essentialLinks: linksData,
      tab: "mails"
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["logoutUser"])
  }
};
</script>
