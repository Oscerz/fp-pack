import { describe, it, expect } from 'vitest';
import equals from './equals';

describe('equals', () => {
  it('compares primitives and NaN', () => {
    expect(equals(1, 1)).toBe(true);
    expect(equals(1, 2)).toBe(false);
    expect(equals(NaN, NaN)).toBe(true);
  });

  it('compares arrays deeply', () => {
    expect(equals([1, 2], [1, 2])).toBe(true);
    expect(equals([1, [2, 3]], [1, [2, 4]])).toBe(false);
  });

  it('compares objects deeply', () => {
    expect(equals({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    expect(equals({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
  });

  it('compares dates by time value', () => {
    expect(equals(new Date('2020-01-01'), new Date('2020-01-01'))).toBe(true);
    expect(equals(new Date('2020-01-01'), new Date('2021-01-01'))).toBe(false);
  });

  it('handles circular references', () => {
    const a: any = { v: 1 };
    const b: any = { v: 1 };
    a.self = a;
    b.self = b;
    expect(equals(a, b)).toBe(true);

    const c: any = { v: 1 };
    const d: any = { v: 2 };
    c.self = c;
    d.self = d;
    expect(equals(c, d)).toBe(false);
  });

  it('compares maps by deep key/value', () => {
    const a = new Map<any, any>([[{ k: 1 }, { v: 2 }]]);
    const b = new Map<any, any>([[{ k: 1 }, { v: 2 }]]);
    expect(equals(a, b)).toBe(true);

    const c = new Map<any, any>([[{ k: 1 }, { v: 3 }]]);
    expect(equals(a, c)).toBe(false);
  });

  it('compares sets ignoring order', () => {
    const a = new Set([1, 2, 3]);
    const b = new Set([3, 2, 1]);
    expect(equals(a, b)).toBe(true);

    const c = new Set([1, 2, 4]);
    expect(equals(a, c)).toBe(false);
  });

  it('compares symbol-keyed properties', () => {
    const sym = Symbol('x');
    expect(equals({ [sym]: 1 }, { [sym]: 1 })).toBe(true);
    expect(equals({ [sym]: 1 }, { [sym]: 2 })).toBe(false);
  });
});
