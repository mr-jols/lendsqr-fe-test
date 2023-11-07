export function formatDate(backendDate: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
    };
    
    const date = new Date(backendDate);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  