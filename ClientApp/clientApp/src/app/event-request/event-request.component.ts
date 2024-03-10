import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventRequest, Suggestion } from '../Models/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrls: ['./event-request.component.scss'],
})
export class EventRequestComponent {
  eventRequestForm!: FormGroup;
  email!: string;
  suggestions: Suggestion[] = [];
  showSuggestions: boolean = false;

  requestFormData: EventRequest = {
    eventName: '',
    eventType: '',
    eventDate: new Date(),
    numberOfPeoples: 0,
    city: '',
    budget: 0,
    status: '',
  };

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<EventRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string, onlySuggestions: boolean, eventRequest: EventRequest },
  ) {
    this.email = data.email;

    if (this.data.onlySuggestions) {
      this.showSuggestions = true;
      this.getSuggestions(this.data.eventRequest);

    } else {
      this.showSuggestions = false;

      this.eventRequestForm = this.fb.group({
        eventName: ['', Validators.required],
        eventType: ['', Validators.required],
        eventDate: ['', Validators.required],
        numberOfPeoples: ['', Validators.required],
        city: ['', Validators.required],
        budget: ['', Validators.required],
      });
    }
  }

  sendRequest() {
    this.requestFormData = this.eventRequestForm.value;

    this.eventService.sendRequest(this.requestFormData, this.email).subscribe(
      (result: Suggestion[]) => {
        this.suggestions = result;
        this.showSuggestions = true;
      },
      (error) => {
        this.showSuggestions = false;
        console.log(error);
      }
    );
  }

  approveEvent(suggestion: Suggestion) {
    this.eventService.approveEvent(suggestion, 0).subscribe(
      (result: any) => {
        this.close();
      }
    );
  }

  getSuggestions(eventRequest: EventRequest) {
  }

  close() {
    this.dialogRef.close();
  }
}