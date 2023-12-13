export function getAMPM(timeString: string): string {
  // Extract the hour from the time string
  const hour: number = parseInt(timeString.split(':')[0], 10);

  // Determine AM or PM based on the hour
  const period: string = hour >= 12 ? 'PM' : 'AM';

  return period;
}

export function getMessageForStatus(
  date: string,
  appointmentStatus:
    | 'pending'
    | 'scheduled'
    | 'cancelled'
    | 'complete'
    | 'decline'
): string {
  switch (appointmentStatus) {
    case 'pending':
      return 'Hello there! This is from LGU of Rizal. I would like to inform you that your appointment has been pending.';
    case 'scheduled':
      return (
        'Hello there! This is from LGU of Rizal. I would like to inform you that your appointment has been scheduled. \n ' +
        date
      );
    case 'cancelled':
      return 'Hello there! This is from LGU of Rizal. I would like to inform you that your appointment has been cancelled.';
    case 'complete':
      return 'Hello there! This is from LGU of Rizal. I would like to inform you that your appointment has been complete.';
    case 'decline':
      return 'Hello there! This is from LGU of Rizal. I would like to inform you that your appointment has been declined.';
    default:
      return 'Invalid appointment status.';
  }
}
