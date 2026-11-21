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


export class ExpenseManager{
    expenses: Expense[] = []
    constructor(){
    }
  
    addExpense(id:number, title:string, amount:number,category:string, date: string){
        const categories: string[] = Object.keys(ExpenseCategory).filter((key)=>isNaN(Number(key)))
        
        for(let i = 0; i<this.expenses.length; i++){
            const expense = this.expenses[i]
            if(!expense){
                continue
            }
            if(expense.id == id){
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
            const expense = this.expenses[i]
            if(!expense){
                continue
            }
            if(expense.category == ExpenseCategory[cat as keyof typeof ExpenseCategory]){
                found = true
                console.log({...expense,category:  ExpenseCategory[expense.category]})
            }
        }
        if(!found){
            console.log(`No expenses in this category`);
        }
    }

    mostExpensiveExpense(): Expense | undefined {
        const expenses = this.expenses

        if(expenses.length == 0){
            console.log("There are no expenses")
            return undefined
        }
        let mostExpensive = expenses[0]
        
        if(!mostExpensive){
            return undefined
        }

        for(let i = 1; i<expenses.length; i++){
            const expense = this.expenses[i]
            if(!expense){
                continue
            }
            if(expense.amount > mostExpensive.amount){
                mostExpensive = expense
            }
        }
        return mostExpensive
    }

}


