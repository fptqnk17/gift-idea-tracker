import { formatPrice } from '@/utils/priceUtils';

describe('Price Utilities', () => {
  describe('formatPrice', () => {
    it('should format a simple price correctly', () => {
      expect(formatPrice(10.5)).toBe('10.50');
    });

    it('should add commas for thousands separators', () => {
      expect(formatPrice(1000)).toBe('1,000.00');
      expect(formatPrice(1000000)).toBe('1,000,000.00');
    });

    it('should handle zero correctly', () => {
      expect(formatPrice(0)).toBe('0.00');
    });

    it('should handle decimal values correctly', () => {
      expect(formatPrice(99.99)).toBe('99.99');
      expect(formatPrice(99.9)).toBe('99.90');
      expect(formatPrice(99.999)).toBe('100.00'); // Rounds to two decimal places
    });

    it('should handle negative values correctly', () => {
      expect(formatPrice(-10.5)).toBe('-10.50');
      expect(formatPrice(-1000)).toBe('-1,000.00');
    });

    it('should handle very large numbers correctly', () => {
      expect(formatPrice(9999999.99)).toBe('9,999,999.99');
    });

    it('should handle very small decimal values correctly', () => {
      expect(formatPrice(0.01)).toBe('0.01');
      expect(formatPrice(0.1)).toBe('0.10');
    });
  });
});