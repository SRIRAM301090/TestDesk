import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'
import scroll from "./store-scroll";
import auth from "./store-auth";
import test from "./store-test";
import reports from "./store-reports";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      scroll,
      auth,
      test,
      reports
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  return Store;
}
