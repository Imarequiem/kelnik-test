import { ref, onMounted, onUnmounted } from 'vue'

import { useScrollToTop } from '@/shared/lib/useScrollToTop'

export function useScrollButton(threshold = 200) {
  const { scrollToTop } = useScrollToTop()

  const show = ref(false)

  const handleWindowScroll = () => show.value = window.scrollY > threshold

  const handleScrollTop = (): void => scrollToTop(document.documentElement)

  onMounted(() => window.addEventListener('scroll', handleWindowScroll))

  onUnmounted(() => window.removeEventListener('scroll', handleWindowScroll))

  return { show, handleScrollTop }
}
