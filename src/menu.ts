import * as readline from "readline"
import { ExpenseManager } from "./ExpenseManager.ts";



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const expenseManager = new ExpenseManager()

export function start(): void{
rl.question(
    `
                 PERSONAL EXPENSE MANAGER
────────────────────────────────────────────────────────────────────

  [1] Add Expense
  [2] View Expenses
  [3] Calculate Total
  [4] Filter by Category
  [5] Most Expensive Expense
  [6] Exit

────────────────────────────────────────────────────────────────────
  SPENDWISE >   
    
        `,(choice)=>{
            switch(Number(choice)){
                case 1:
                    getExpenseDetails()
                    break;

                case 2:
                    expenseManager.getExpenses()
                    start()
                    break;

                case 3:
                    const total = expenseManager.calculateTotalExpenditure()
                    console.log(`Total expenditure - GHS${total}`)
                    start()
                    break;
                
                case 4:
                    getfilterDetails()
                    break;

                case 5:
                    const most = expenseManager.mostExpensiveExpense()
                    console.log(`Most expensive expenditure - ${most?.title}: GHS${most?.amount}`)
                    break;

                case 6:
                    rl.close()
                    break;
                
                default:
                    console.log(`Provide a valid response`)
                    start()

            }
        
    })
}



function getExpenseDetails():void{
        rl.question(`Enter expense ID`,(ID)=>{

            rl.question(`Enter title`,(title)=>{

                rl.question(`Enter amount`,(amount)=>{

                    rl.question(`Enter category`,(category)=>{
                        
                        rl.question(`Enter date`,(date)=>{
                            expenseManager.addExpense(Number(ID),title,Number(amount),category,date)
                            start()
                        })
                    })
                })
            })
        })
    }

    function getfilterDetails(): void{
    rl.question(`Enter category: `, (category)=>{
        expenseManager.filterByCategory(category)
        start()
    })
}