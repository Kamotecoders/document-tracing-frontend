export function getAMPM(timeString: string): string {
  // Extract the hour from the time string
  const hour: number = parseInt(timeString.split(':')[0], 10);

  // Determine AM or PM based on the hour
  const period: string = hour >= 12 ? 'PM' : 'AM';

  return period;
}

export function getMessageForStatus(
  appointmentStatus:
    | 'pending'
    | 'scheduled'
    | 'cancelled'
    | 'complete'
    | 'decline'
): string {
  switch (appointmentStatus) {
    case 'pending':
      return 'Your appointment is pending.';
    case 'scheduled':
      return 'Your appointment is scheduled.';
    case 'cancelled':
      return 'Your appointment has been cancelled.';
    case 'complete':
      return 'Your appointment is complete.';
    case 'decline':
      return 'Your appointment has been declined.';
    default:
      return 'Invalid appointment status.';
  }
}
