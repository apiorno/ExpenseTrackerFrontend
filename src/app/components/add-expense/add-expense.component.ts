import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  
  expense: Expense = new Expense();
  
  constructor(private _service: ExpenseService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._service.getExpenseById(id).subscribe(
        data  => this.expense = data
      )
    }
  }

  saveExpense(){
    this._service.saveExpense(this.expense).subscribe(
      data  => {
        console.log('response', data);
        this._router.navigateByUrl("/expenses");
      }
    )
  }
  deleteExpense(id: number){
    this._service.deleteExpense(id).subscribe(
      data => {
        console.log('deleted response',data)
        this._router.navigateByUrl("/expenses")
      }
    )
  }
}
