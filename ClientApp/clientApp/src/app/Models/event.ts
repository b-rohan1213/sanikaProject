export interface EventRequest {
  eventName: string;
  eventType: string;
  eventDate: Date;
  numberOfPeoples: number;
  city: string;
  budget: number;
  status: string;
}

export interface Transaction {
  transacctionDate: Date;
  description: string;
  amount: number;
  userId: number;
  eventId: number;
}

export interface Suggestion {
  venue: string;
  date: Date;
  costs: number;
  venueId: number;
}

export interface EventFinance {
  eventName: string;
  eventDate: Date;
  paidAmount: number;
  pendingAmount: number;
  totalNumber: number;
}
