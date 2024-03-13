import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RejectComponent } from '../reject/reject.component';
import { EventRequest } from '../Models/event';
import { RegisterUser, UserDetails } from '../Models/user';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';
import { EventRequestComponent } from '../event-request/event-request.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  events: EventRequest[] = [];
  rejectedEvents: EventRequest[] = [];
  upcomingEvents: EventRequest[] = [];
  pastEvents: EventRequest[] = [];
  pendingRequests: EventRequest[] = [];

  email: string = "";
  today = new Date();
  isPastEventsExpanded: boolean = false;
  columndefs: any;

  userDetails: UserDetails = {
    name: '',
    email: '',
    contactNo: '',
    userType:''
  };

  constructor(private router: ActivatedRoute, private eventSevice: EventService, private dialog: MatDialog, private userServie: UserService) {
    this.email = this.router.snapshot.params['email'];

    this.getUserDetails(this.email);
    this.getEventByUser(this.email);
  }

  showSuggestions(element: EventRequest) {
    console.log(element);
  }

  openRequest() {
    this.dialog.open(EventRequestComponent, {
      data: { email: this.email, onlySuggestions: false, eventRequest: null },
      disableClose: true,
      width:'fit-content',
      height:'fit-content'
    });
  }

  viewSuggestions(eventRequest: EventRequest) {
    this.dialog.open(EventRequestComponent, {
      data: { email: this.email, onlySuggestions: true, eventRequest: eventRequest },
      disableClose: false,
    });
  }

  getUserDetails(email: string) {
    this.userServie.getUserDetails(email).subscribe(
      (response)=>{
        this.userDetails = response;
      }
    )
  }

  getEventByUser(email: string) {
    this.eventSevice.getEventRequestsByUser(email).subscribe(
      (result: EventRequest[]) => {
        this.events = result;

        this.events.forEach(ev => {
          if (ev.status === 'rejected') {
            this.rejectedEvents.push(ev);
          }
          else if (ev.status.toLowerCase() === 'approved' && ev.eventDate >= this.today) {
            this.upcomingEvents.push(ev);
          }
          else if (ev.status.toLowerCase() === 'approved' && ev.eventDate < this.today) {
            this.pastEvents.push(ev);
          }
          else if (ev.status.toLowerCase() === 'pending') {
            this.pendingRequests.push(ev);
          }
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  rejectEvent(request: EventRequest) {
    this.dialog.open(RejectComponent, {
      data: request,
      disableClose: true, 
    })
  }
}