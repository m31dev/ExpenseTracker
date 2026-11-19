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
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i].id == id) {
                console.log('An expense with the same ID exists');
                return;
            }
        }
        if (!categories.includes(category)) {
            console.log("This category does not exist");
            return;
        }
        if (title.trim() === "") {
            console.log("All fields must be provided");
            return;
        }
        if (amount <= 0) {
            console.log("Amount must be greater than zero");
            return;
        }
        if (date.trim() === "") {
            console.log("All fields must be provided");
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
            console.log({ ...expense, category: ExpenseCategory[expense.category] });
        });
    }
    calculateTotalExpenditure() {
        let accummulator = 0;
        this.expenses.forEach((expense) => {
            accummulator += expense.amount;
        });
        console.log(`Total Expenditure - ${accummulator}`);
    }
    filterByCategory(cat) {
        const categories = Object.keys(ExpenseCategory).filter((key) => { isNaN(Number(key)); });
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i].category == ExpenseCategory[cat]) {
                console.log({ ...this.expenses[i], category: ExpenseCategory[this.expenses[i].category] });
            }
        }
    }
    mostExpensiveExpense() {
        let mostExpensive = this.expenses[0];
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i].amount > mostExpensive.amount) {
                mostExpensive = this.expenses[i];
            }
        }
        console.log(`Most Expensive Expense: ${mostExpensive.title}-${mostExpensive.amount}`);
    }
}
const ex = new ExpenseManager();
ex.addExpense(1, "FoodParty", 100, "Food", "17th November 2026");
ex.addExpense(1, "FoodParty", 200, "Food", "17th November 2026");
ex.addExpense(2, "FoodPartyFufu", 300, "Food", "17th November 2026");
ex.getExpenses();
ex.calculateTotalExpenditure();
ex.filterByCategory("Food");
ex.mostExpensiveExpense();
