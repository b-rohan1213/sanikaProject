import { EventService } from './../services/event.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.scss']
})
export class RejectComponent {
  rejectionForm!: FormGroup;
  eventId: number = 0;

  constructor(private fb: FormBuilder, private eventService: EventService, private rejectRef: MatDialogRef<RejectComponent>) {
    this.rejectionForm = this.fb.group({
      reason: ['']
    });
  }

  reject() {
    this.eventService.rejectEvent(this.eventId, this.rejectionForm.get('reason')?.value).subscribe((result: any) => {
      this.rejectRef.close();
    },
      (error: any) => { });
  }

  cancel() {
    this.rejectRef.close();
  }
}
