let timer: NodeJS.Timeout
export const Debounce = (callback: () => void, timeout = 500): void => {
  clearTimeout(timer)
  timer = setTimeout(() => callback(), timeout)
}
