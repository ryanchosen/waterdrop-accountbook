import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { category } from "./modules/category";
import { record } from "./modules/record";

Vue.use(Vuex);

const store: StoreOptions<{}> = {
  state: {},
  modules: {
    category,
    record,
  },
};

export default new Vuex.Store(store);
