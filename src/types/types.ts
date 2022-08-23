export interface ExpenseData {
    _id?: string,
    date: string;
    category: string;
    description: string;
    amount: string;
  }
  
  export interface IncomeData {
    _id?: string,
    date: string;
    source: string;
    description: string;
    amount: string;
  }

  export interface CommonData {
    currency: string,
    isExpenseOrIncomeTable: boolean,
    selectedChart: string,
    currentPage: number,
    currentPageIncome: number,
    postsPerPage: number,
  }