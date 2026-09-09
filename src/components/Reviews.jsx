import { reviews } from '../data/site'
import './Reviews.css'

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
  return (
    <section
      className="reviews section section--anchor"
      id="reviews"
      aria-labelledby="reviews-heading"
    >
      <div className="shell reviews__layout">
        <div className="reviews__aside reveal">
          <p className="eyebrow">Google reviews</p>

          <h2 id="reviews-heading" className="reviews__rating">
            <span aria-hidden="true">{reviews.rating}</span>
            <span className="visually-hidden">{`Rated ${reviews.rating} out of 5 on Google`}</span>
          </h2>

          <Stars count={5} className="reviews__stars" />
          <p className="reviews__count">{reviews.count}</p>

          <div className="reviews__ask">
            <a
              className="btn btn--accent"
              href={reviews.reviewUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Leave us a review
            </a>
            <p className="reviews__note">
              Thirty seconds of your time keeps a small Colorado Springs shop on the map.
            </p>
          </div>
        </div>

        <ul className="reviews__list">
          {reviews.items.map((review, index) => (
            <li className="review reveal" key={review.id} style={{ '--i': index }}>
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
