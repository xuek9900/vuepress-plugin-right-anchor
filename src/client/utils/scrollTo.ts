export const scrollToTop = (top: number = 0): void => 
  window.scrollTo({ top, behavior: 'smooth' })

export const scrollToTitle = (id: string): void => 
  scrollToTop(document.getElementById(id)?.offsetTop)
