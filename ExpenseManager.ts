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
        
        if(!categories.includes(category)){
            console.log("This category does not exist")
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
        }
        
        
        const newExpense: Expense = {
            id,
            title,
            amount,
            category:ExpenseCategory[category as keyof typeof ExpenseCategory],
            date,
        }

        this.expenses.push(newExpense)
    }

    getExpenses(){
        this.expenses.forEach((expense)=>{
            console.log({...expense, category:ExpenseCategory[expense.category]})
        })
    }

}

const ex = new ExpenseManager()
ex.addExpense(1,"FoodParty",100,"Food","17th November 2026")
ex.getExpenses()