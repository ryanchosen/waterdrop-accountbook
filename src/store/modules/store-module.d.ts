interface Category {
  name: string;
  icon: string;
  id: number;
  moneyType: MoneyType;
}

interface IndexedCategory extends Category {
  [index: string]: any;
}

type MoneyType = "income" | "expenditure";

interface MoneyRecord {
  createAt: string;
  moneyType: MoneyType;
  categoryId: number;
  id: number;
  amount: number;
}

interface IndexedMoneyRecord extends MoneyRecord {
  [index: string]: any;
}

interface CategoryState {
  categoryList: Category[];
}

interface MoneyRecordState {
  recordList: MoneyRecord[];
}
