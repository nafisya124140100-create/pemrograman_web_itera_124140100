import { act, renderHook } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  it('mengembalikan nilai awal lalu menyimpannya ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('demo-key', 'awal'));
    expect(result.current[0]).toBe('awal');

    act(() => result.current[1]('baru'));

    expect(result.current[0]).toBe('baru');
    expect(JSON.parse(window.localStorage.getItem('demo-key'))).toBe('baru');
  });

  it('membaca nilai yang sudah tersimpan di localStorage', () => {
    window.localStorage.setItem('demo-key', JSON.stringify({ a: 1 }));
    const { result } = renderHook(() => useLocalStorage('demo-key', {}));
    expect(result.current[0]).toEqual({ a: 1 });
  });
});