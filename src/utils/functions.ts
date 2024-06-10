export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
  };

  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

export function isStringContained(mainString: string, searchString: string): boolean {
  return mainString.toLowerCase().includes(searchString.toLowerCase());
}
