export type Expense = {
  id: string;
  expenseName: string;
  amount: number;
  category: string;
  date: Value;
};

export type DraftExpense = Omit<Expense, 'id'> // all Expense type less id

// React Date Picker types
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];


export type Category = {
    id: string
    name: string
    icon: string
}