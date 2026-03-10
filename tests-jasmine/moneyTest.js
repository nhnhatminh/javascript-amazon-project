import { formatCurrency } from "../script/utils/money.js";

describe('Test suite: formatCurrency', () => {
  it('Convert cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('Works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('Round up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('Round down to the nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
})