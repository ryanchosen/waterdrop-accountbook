import {getKeyByPrefix} from "@/store/utils/index";
import {PREFIX} from "@/store/constants";

const KEY = getKeyByPrefix(PREFIX, 'max_category_id')
let maxCategoryId = parseInt(window.localStorage.getItem(KEY) || '0') || 0
function generateCategoryId() {
    return ++maxCategoryId
}
function saveMaxCategoryId() {
    window.localStorage.setItem(KEY, '' + maxCategoryId)
}

export {
    generateCategoryId,
    saveMaxCategoryId
}
