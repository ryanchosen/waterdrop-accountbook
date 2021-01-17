import {MutationTree, Module, ActionTree, GetterTree} from "vuex";
import {generateCategoryId, saveMaxCategoryId} from "@/store/utils/generateCategoryId";
import {getCategories, getCategoryById, getKeyByPrefix} from "@/store/utils";
import {PREFIX} from "@/store/constants";

const KEY = getKeyByPrefix(PREFIX, 'categories')
const defaultCategoryList: Omit<Category, 'id'>[] = [
  {
    name: "餐饮",
    icon: "canyin",
    moneyType: "expenditure",
  },
  {
    name: "旅行",
    icon: "lvxing",
    moneyType: "expenditure",
  },
  {
    name: "理财",
    icon: "licai",
    moneyType: "income",
  },
  {
    name: "读书",
    icon: "dushu",
    moneyType: "expenditure",
  },
  {
    name: "交通",
    icon: "jiaotong",
    moneyType: "expenditure",
  },
  {
    name: "数码",
    icon: "shuma",
    moneyType: "expenditure",
  },
  {
    name: "工资",
    icon: "gongzi",
    moneyType: "income",
  },
]

const state: CategoryState = {
  categoryList: [],
};

const mutations: MutationTree<CategoryState> = {
  add(state, payload: Omit<Category, "id">) {
    state.categoryList.push({
      id: generateCategoryId(),
      ...payload,
    });
  },
  delete(state, id: number) {
    state.categoryList = state.categoryList.filter((category) => {
      return category.id !== id;
    });
  },
  edit(state, payload: Pick<Category, "id"> & Partial<Omit<Category, "id">>) {
    const category = getCategoryById(state.categoryList, payload.id)
    if (category) {
      const index = state.categoryList.indexOf(category);
      state.categoryList.splice(index, 1, {
        ...category,
        ...payload,
      });
    }
  },
};
const actions: ActionTree<CategoryState, {}> = {
  add({state, commit, dispatch}, payload: Omit<Category, "id">) {
    commit('add', payload)
    saveMaxCategoryId()
    dispatch('save')
  },
  edit({commit, dispatch}, payload: Pick<Category, "id"> & Partial<Omit<Category, "id">>) {
    commit('edit', payload)
    dispatch('save')
  },
  delete({commit, dispatch}, id: number) {
    commit('delete', id)
    dispatch('save')
  },
  save({state}) {
    window.localStorage.setItem(KEY, JSON.stringify(state.categoryList))
  },
  load({state, dispatch}) {
    const list = JSON.parse(window.localStorage.getItem(KEY) || '[]')
    if (list.length > 0) {
      state.categoryList = list
      return
    }
    // 默认情况下添加类型
    defaultCategoryList.forEach(({name, icon, moneyType}) => {
      dispatch('add', {
        name,
        icon,
        moneyType
      })
    })
  }
}

const getters: GetterTree<CategoryState, {}> = {
  getCategoryById: state => (id: number) => {
    return getCategoryById(state.categoryList, id)
  },
  getCategories: state => (option: Partial<IndexedCategory>) => {
    return getCategories(state.categoryList, option)
  },
  getCategoryIcon: (state, getters) => (id: number) => {
    const category = getters.getCategoryById(id)
    return category ? category.icon : ''
  },
  getCategoryName: (state, getters) => (id: number) => {
    const category = getters.getCategoryById(id)
    return category ? category.name : ''
  }
}

export const category: Module<CategoryState, {}> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
