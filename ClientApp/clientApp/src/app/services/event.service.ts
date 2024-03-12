import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventRequest, Suggestion, Transaction } from '../Models/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  baseUrl: string = 'https://localhost:44301';
  constructor(private http: HttpClient) { }

  sendRequest(eventRequest: EventRequest, email: string): Observable<Suggestion[]> {
    return this.http.post<Suggestion[]>(`${this.baseUrl}/event/request/${email}`, eventRequest);
  }

  makePayment(userId: number, eventId: number, transactionData: Transaction): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/event/payment?user=${userId}&event=${eventId}`, transactionData);
  }

  rejectEvent(eventId: number, reason: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/event/${eventId}/reject`, reason);
  }

  approveEvent(suggestion: Suggestion, eventId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/event/${eventId}/venue/${suggestion.venueId}`, null);
  }

  getEventRequestsByUser(email: string): Observable<EventRequest[]> {
    return this.http.get<EventRequest[]>(`${this.baseUrl}/event/user/${email}`);
  }

  getEventFinance(){
    return this.http.get(`${this.baseUrl}/event/finance`);
  }

  addTransaction(eventId: number,transaction:Transaction){
    return this.http.post(`${this.baseUrl}/event/${eventId}/transaction`,transaction);
  }
}
