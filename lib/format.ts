const USD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** 245 → "$245". All displayed prices go through this. */
export const usd = (n: number) => USD.format(n);
