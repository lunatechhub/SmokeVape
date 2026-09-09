import { useEffect, useRef, useState } from 'react'

/* One <img> wrapper shared by the hero, the category cards and the product
   cards. It adds .is-loaded once the file has actually decoded, which is what
   drives the fade-and-settle in index.css.

   A cached image can finish loading before React attaches onLoad, so the
   effect re-checks .complete on mount — without it a cached photo would sit
   at opacity 0 forever. */
function Media({ image, className = '', ...rest }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (node && node.complete && node.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      className={`media ${className} ${loaded ? 'is-loaded' : ''}`.trim()}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      onLoad={() => setLoaded(true)}
      {...rest}
    />
  )
}

export default Media
