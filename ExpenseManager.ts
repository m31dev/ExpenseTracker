import readline = require("node:readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



enum ExpenseCategory{
    Food,
    Transportation,
    Bills,
    Entertainment,
    Other
}


interface Expense{
    id: number,
    title: string,
    amount: number,
    category: ExpenseCategory
    date: string
}


class ExpenseManager{
    expenses: Expense[] = []
    constructor(){
    }
  
    addExpense(id:number, title:string, amount:number,category:string, date: string){
        const categories: string[] = Object.keys(ExpenseCategory).filter((key)=>isNaN(Number(key)))
        
        for(let i = 0; i<this.expenses.length; i++){
            if(this.expenses[i].id == id){
                console.log('An expense with the same ID exists')
                return
            }
        }
        if(!categories.includes(category)){
            console.log("This category does not exist")
            return
        }
        if(id <= 0){
            console.log("Id must not be negative")
            return
        }
        if(title.trim() === ""){
            console.log("All fields must be provided")
            return
        }
        if(amount <= 0){
            console.log("Amount must be greater than zero")
            return
        }
        if(date.trim() === ""){
            console.log("All fields must be provided")
            return
        }
        
        
        const newExpense: Expense = {
            id,
            title,
            amount,
            category:ExpenseCategory[category as keyof typeof ExpenseCategory],
            date,
        }
        this.expenses.push(newExpense)
        console.log("Expense successfully added")
    }

    getExpenses(){
         if(this.expenses.length == 0){
            console.log("There are no expenses")
            return
        }
        this.expenses.forEach((expense)=>{
            console.log({...expense, category:ExpenseCategory[expense.category]})
        })
    }

    calculateTotalExpenditure(): number{
         if(this.expenses.length == 0){
            console.log("There are no expenses to calculate")
            return 0
        }
        let accummulator: number = 0
        this.expenses.forEach((expense)=>{
            accummulator += expense.amount
        })
        return accummulator
    }

    filterByCategory(cat: string){
        let found: boolean = false
         if(this.expenses.length == 0){
            console.log("There are no expenses")
            return
        }
        const categories: string[] = Object.keys(ExpenseCategory).filter((key)=>isNaN(Number(key)))
        if(!categories.includes(cat)){
            console.log(`Enter a valid category`)
            return
        }
        for(let i = 0; i < this.expenses.length; i++){
            if(this.expenses[i].category == ExpenseCategory[cat as keyof typeof ExpenseCategory]){
                found = true
                console.log({...this.expenses[i],category:  ExpenseCategory[this.expenses[i].category]})
            }
        }
        if(!found){
            console.log(`No expenses in this category`);
        }
    }

    mostExpensiveExpense(): Expense | undefined {
        if(this.expenses.length == 0){
            console.log("There are no expenses")
            return undefined
        }
        let mostExpensive: Expense = this.expenses[0]
        for(let i = 1; i<this.expenses.length; i++){
            if(this.expenses[i].amount > mostExpensive.amount){
                mostExpensive = this.expenses[i]
            }
        }
        return mostExpensive
    }

}

const ex = new ExpenseManager()
/*ex.addExpense(1,"FoodParty",100,"Food","17th November 2026")
ex.addExpense(1,"FoodParty",200,"Food","17th November 2026")
ex.addExpense(2,"FoodPartyFufu",300,"Food","17th November 2026")
ex.getExpenses()
ex.calculateTotalExpenditure()
ex.filterByCategory("Food")
ex.mostExpensiveExpense()*/


rl.question(`
    SPENDWISE - PERSONAL EXPENSE MANAGER

    1. Add an expense
    2. View all expenses
    3. Calculate total expenditure
    4. Filter expenses by category
    5. Find most expensive expense
    6. Exit

    Enter your choice:
    `,(choice)=>{
        switch(Number(choice)){
            case 1:
                getExpenseDetails()
                break;

            case 2:
                ex.getExpenses()
                break;
                
            case 3:

        }
       
})

function getExpenseDetails(){
        rl.question(`Enter expense ID`,(ID)=>{

            rl.question(`Enter title`,(title)=>{

                rl.question(`Enter amount`,(amount)=>{

                    rl.question(`Enter category`,(category)=>{
                        
                        rl.question(`Enter date`,(date)=>{
                            ex.addExpense(Number(ID),title,Number(amount),category,date)
                        })
                    })
                })
            })
        })
    }