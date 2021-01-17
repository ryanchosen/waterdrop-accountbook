import {getKeyByPrefix} from "@/store/utils/index";
import {PREFIX} from "@/store/constants";

const KEY = getKeyByPrefix(PREFIX, 'max_record_id')
let maxRecordId = parseInt(window.localStorage.getItem(KEY) || '0') || 0
function generateRecordId() {
    return ++maxRecordId
}
function saveMaxRecordId() {
    window.localStorage.setItem(KEY, '' + maxRecordId)
}

export {
    generateRecordId,
    saveMaxRecordId
}
