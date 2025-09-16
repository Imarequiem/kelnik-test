export interface UseScrollToTopOptions extends ScrollToOptions {}

export interface UseScrollToTopReturn {
  scrollToTop: (element?: HTMLElement | string) => void
}

export const useScrollToTop = (
  settings: UseScrollToTopOptions = { top: 0, behavior: 'smooth' }
): UseScrollToTopReturn => {
  const scrollToTop = (element?: HTMLElement | string) => {
    if (!process.client) return

    if (element) {
      const target =
        typeof element === 'string'
          ? document.querySelector<HTMLElement>(element)
          : element

      if (target) {
        target.scrollIntoView({
          behavior: settings.behavior || 'smooth',
          block: 'start'
        })

        return
      }
    }

    window.scrollTo(settings)
  }

  return {
    scrollToTop
  }
}