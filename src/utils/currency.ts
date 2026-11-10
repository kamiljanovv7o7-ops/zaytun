export type Currency = 'KGS' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: {
    ky: string;
    uz: string;
    ru: string;
    en: string;
  };
  flag: string;
  rateToKgs: number; // 1 unit of this currency = how many KGS
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  KGS: {
    code: 'KGS',
    symbol: 'сом',
    name: {
      ky: 'Кыргыз сому (сом)',
      uz: 'Qirgʻiz soʻmi (som)',
      ru: 'Кыргызский сом (сом)',
      en: 'Kyrgyz Som (KGS)',
    },
    flag: '🇰🇬',
    rateToKgs: 1,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: {
      ky: 'АКШ доллары ($)',
      uz: 'AQSH dollari ($)',
      ru: 'Доллар США ($)',
      en: 'US Dollar ($)',
    },
    flag: '🇺🇸',
    rateToKgs: 87.5,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: {
      ky: 'Евро (€)',
      uz: 'Yevro (€)',
      ru: 'Евро (€)',
      en: 'Euro (€)',
    },
    flag: '🇪🇺',
    rateToKgs: 95.0,
  },
};

/**
 * Format a price given in KGS into the target currency
 */
export function formatCurrencyPrice(amountInKgs: number, currency: Currency = 'KGS'): string {
  if (isNaN(amountInKgs) || amountInKgs === 0) {
    if (currency === 'KGS') return '0 сом';
    if (currency === 'USD') return '$0';
    if (currency === 'EUR') return '€0';
  }

  if (currency === 'KGS') {
    return `${Math.round(amountInKgs).toLocaleString()} сом`;
  }

  const config = CURRENCIES[currency] || CURRENCIES.KGS;
  const converted = amountInKgs / config.rateToKgs;

  // For USD / EUR: format with 2 decimals if not a round integer, or clean rounding
  const formattedVal = converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${config.symbol}${formattedVal}`;
}
