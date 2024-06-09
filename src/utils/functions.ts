export function formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
    };
    
    const date = new Date(date);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  