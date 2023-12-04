export interface Appointment {
  id: number;
  user_id: number;
  fullname: string;
  outlet: string;
  date: string;
  time: string;
  government_id: string;
  purpose: string;
  appointmentStatus:
    | 'pending'
    | 'schedulled'
    | 'cancelled'
    | 'complete'
    | 'decline';
}
