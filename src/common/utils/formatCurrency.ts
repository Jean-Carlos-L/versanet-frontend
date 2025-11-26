export const formatCurrency = ({
  amount,
  currency = "USD",
  locale = "en-US",
}: {
  amount: number;
  currency?: string;
  locale?: string;
}): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0
  }).format(amount);
};
