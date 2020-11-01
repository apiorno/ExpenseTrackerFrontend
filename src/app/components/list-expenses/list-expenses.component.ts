import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.css']
})
export class ListExpensesComponent implements OnInit {

  expenses: Expense[]=[];
  filters = {
    keyword: ''
  }
  constructor(private _service: ExpenseService) { }

  ngOnInit(): void {
    this.listExpenses();
  }

  listExpenses(){
    this._service.getExpenses().subscribe(
      data => this.expenses = this.filterExpenses(data)
    )
  }

  deleteExpense(id: number){
    this._service.deleteExpense(id).subscribe(
      data => {
        console.log("deleted response",data)
        this.listExpenses();
      }
    )
  }

  filterExpenses(expenses: Expense[]){
    return expenses.filter( (e) =>{
      return e.name.toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }


}
