import dayjs from "dayjs";

function getRecordsByTime(records: MoneyRecord[], time: Date, unit: dayjs.UnitType) {
  return records.filter(record => {
    return dayjs(time).isSame(record.createAt, unit)
  })
}

function getRecords(records: IndexedMoneyRecord[], option: Partial<IndexedMoneyRecord>) {
  return records.filter(record => {
    for (const key in option) {
      if (!Object.prototype.hasOwnProperty.call(option, key)) continue
      if (record[key] !== option[key]) return false
    }
    return true
  })
}

function getCategoryById(categories: Category[], id: number) {
  return categories.filter(category => category.id === id)[0]
}

function getCategories(categories: IndexedCategory[], option: Partial<IndexedCategory>) {
  return categories.filter(category => {
    for (const key in option) {
      if (!Object.prototype.hasOwnProperty.call(option, key)) continue
      if (category[key] !== option[key]) return false
    }
    return true
  })
}

function getKeyByPrefix(prefix = '', key: string) {
  return prefix + '_' + key
}


export {
  getRecordsByTime,
  getCategoryById,
  getRecords,
  getCategories,
  getKeyByPrefix
}
