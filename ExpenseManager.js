"use strict";
var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory[ExpenseCategory["Food"] = 0] = "Food";
    ExpenseCategory[ExpenseCategory["Transportation"] = 1] = "Transportation";
    ExpenseCategory[ExpenseCategory["Bills"] = 2] = "Bills";
    ExpenseCategory[ExpenseCategory["Entertainment"] = 3] = "Entertainment";
    ExpenseCategory[ExpenseCategory["Other"] = 4] = "Other";
})(ExpenseCategory || (ExpenseCategory = {}));
class ExpenseManager {
    expenses = [];
    constructor() {
    }
    addExpense(id, title, amount, category, date) {
        const categories = Object.keys(ExpenseCategory).filter((key) => isNaN(Number(key)));
        if (!categories.includes(category)) {
            console.log("This category does not exist");
            console.log(categories);
            return;
        }
        const newExpense = {
            id,
            title,
            amount,
            category: ExpenseCategory[category],
            date,
        };
        this.expenses.push(newExpense);
    }
    getExpenses() {
        this.expenses.forEach((expense) => {
            console.log(expense);
        });
    }
}
const ex = new ExpenseManager();
ex.addExpense(1, "FoodParty", 100, "Food", "17th November 2026");
ex.getExpenses();
