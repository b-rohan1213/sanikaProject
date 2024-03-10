import { RejectComponent } from './../reject/reject.component';
import { EventFinance } from './../Models/event';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent {
  events: EventFinance[] = []

  datasource = new MatTableDataSource(this.events);

  displayedColumn: string[] = ['eventName', 'eventDate', 'paidAmount', 'totalAmount', 'action'];

  constructor(private dialog: MatDialog) { }

  addTransaction(event: EventFinance) {
    var transactionRef = this.dialog.open(
      RejectComponent //change to transsaction component
      , {
        data: event,
        disableClose: true,
        width: '40%',
        height: 'auto'
      });

    transactionRef.afterClosed().subscribe(next => {
      this.getEvent();
    });
  }

  getEvent() {
    //code to get events finance
  }
}
