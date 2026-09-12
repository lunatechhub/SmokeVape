import { useEffect, useRef, useState } from 'react'
import { isSet, site } from '../data'
import './Reviews.css'

/* The score counts up once, the first time it is scrolled into view. It is
   the only number on the page that moves.

   Reduced motion, no IntersectionObserver, or a rating that is not a number:
   the final value is rendered outright and nothing animates. The screen
   reader text beside it is never the animated value — it always reads the
   real rating, so a listener is not told 0.0 out of 5. */
function useCountUp(value, duration = 620) {
  const target = Number.parseFloat(value)
  const ref = useRef(null)
  /* Starts at the real score, never at zero. If the observer never fires --
     the block is never scrolled to, the tab is in the background, the API is
     missing -- the worst case is that nothing animates, rather than a
     visitor being shown 0.0 as the shop's rating. The count starts from zero
     only at the moment the animation actually begins. */
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node || Number.isNaN(target)) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (!('IntersectionObserver' in window)) return undefined

    let frame = 0
    let settle = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        const start = performance.now()
        setShown('0.0')
        /* A backstop. requestAnimationFrame is throttled to a standstill in
           a background tab, and a frame loop that stops halfway leaves the
           shop's rating reading whatever it had counted to -- 2.5 out of 5.
           This lands the true value once, whatever the frames did. */
        settle = setTimeout(() => setShown(value), duration + 200)
        const step = (now) => {
          /* Clamped at both ends. The first frame's timestamp can precede
             the performance.now() taken a moment earlier, which made t
             negative, and a negative t through the ease returns a negative
             number — the score rendered as "-0.2" for a frame. */
          const t = Math.min(Math.max((now - start) / duration, 0), 1)
          /* Ease out, so it settles rather than stopping dead. */
          const eased = 1 - (1 - t) ** 3
          setShown((target * eased).toFixed(1))
          if (t < 1) frame = requestAnimationFrame(step)
          else setShown(value)
        }
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.6 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      clearTimeout(settle)
    }
  }, [target, duration, value])

  return [ref, shown]
}

function Stars({ count, className }) {
  return (
    <p className={className}>
      <span aria-hidden="true">{'★'.repeat(count)}</span>
      <span className="visually-hidden">{`${count} out of 5 stars`}</span>
    </p>
  )
}

/* Two columns: the score and the ask stay pinned on the left while the
   quotes scroll past on the right, separated by hairlines rather than boxed
   into cards. Four identical cards in a row reads as filler — a stacked
   column of quotes reads like someone actually chose them. */
function Reviews() {
  const [ratingRef, shownRating] = useCountUp(site.rating.score)

  return (
    <section
      className="reviews section section--anchor"
      id="reviews"
      aria-labelledby="reviews-heading"
    >
      <div className="shell reviews__layout">
        <div className="reviews__aside reveal">
          <p className="eyebrow">Google reviews</p>

          <h2 id="reviews-heading" className="reviews__rating" ref={ratingRef}>
            <span aria-hidden="true">{shownRating}</span>
            <span className="visually-hidden">{`Rated ${site.rating.score} out of 5 on Google`}</span>
          </h2>

          <Stars count={5} className="reviews__stars" />
          <p className="reviews__count">{`Based on ${site.rating.count} reviews on Google`}</p>

          {isSet(site.reviewUrl) && (
            <div className="reviews__ask">
              <a
                className="btn btn--accent"
                href={site.reviewUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Leave us a review
              </a>
              <p className="reviews__note">{site.copy.reviewsNote}</p>
            </div>
          )}
        </div>

        <ul className="reviews__list">
          {site.reviews.map((review, index) => (
            <li className="review reveal" key={`${index}-${review.name}`} style={{ '--i': index }}>
              <blockquote className="review__quote">
                <p>{review.quote}</p>
              </blockquote>
              <div className="review__foot">
                <span className="review__name">{review.name}</span>
                <span className="review__rule" aria-hidden="true" />
                <Stars count={review.stars} className="review__stars" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Reviews
