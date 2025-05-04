import { formatDate } from '@/utils/dateUtils';

describe('dateUtils', () => {
  it('should format a date correctly', () => {
    const date = new Date('2025-05-02').toISOString();
    expect(formatDate(date)).toBe('May 2, 2025');
  });
});
