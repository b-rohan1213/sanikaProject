import { EventFinance } from './../Models/event';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, inject, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  transactionForm!: FormGroup

  constructor(private fb: FormBuilder, private transactionRef: DialogRef<TransactionComponent>
    //  @inject(MAT_DIALOG_DATA) eventFinance: EventFinance
  ) {
    this.transactionForm = this.fb.group({
      transactionDate: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  makePayment() {

  }

  close() {
    this.transactionRef.close();
  }
}
