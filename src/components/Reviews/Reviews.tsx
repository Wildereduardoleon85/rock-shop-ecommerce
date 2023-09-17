import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'
import styles from './Reviews.module.scss'
import { Review } from '../../types'
import { Rating } from '../Rating'
import { capitalize, parseDate } from '../../utils'
import { Button, Input } from '../UI'
import { useInput } from '../../hooks'
import { validateString } from '../../helpers'
import { setAlert, useCreateReviewMutation } from '../../slices'
import { RootState } from '../../store'
import { ROUTES } from '../../constants'

const userHasReviewed = (reviews: Review[], userId: string) => {
  const userReviews = reviews.map((review) => review.user)

  if (userReviews.includes(userId)) {
    return true
  }

  return false
}

type ReviewProps = {
  reviews: Review[]
  productId: string
  refetch: () => void
}

function Reviews({ reviews, productId, refetch }: ReviewProps) {
  const [rating, setRating] = useState<number>(0)
  const [showCommentSection, setShowCommentSection] = useState<boolean>(false)
  const [createReview, { isLoading }] = useCreateReviewMutation()
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const commentInput = useInput({
    initialValue: '',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        min: 2,
        max: 2500,
      },
    },
  })

  const commentInputProps = {
    name: 'comment',
    label: 'Comment:',
    error: commentInput.error,
    type: 'textarea',
    placeholder: 'Write a comment',
    onChange: commentInput.onChange,
    onBlur: commentInput.onBlur,
    value: commentInput.value,
  }

  const onStarButtonClick = (ratingValue: number) => {
    setRating(ratingValue)
    setShowCommentSection(true)
  }

  const onSubmit = async () => {
    if (!commentInput.value || !commentInput.isValid) {
      commentInput.onBlur()
      return
    }

    if (rating || commentInput.value) {
      try {
        await createReview({
          productId,
          comment: commentInput.value,
          rating,
        }).unwrap()
        dispatch(setAlert({ message: 'review added successfuly!' }))
        refetch()
      } catch (error: any) {
        dispatch(
          setAlert({
            variant: 'error',
            message: error?.data?.message ?? 'something went wrong',
          })
        )
      }
    }
  }

  return (
    <div className={styles.root}>
      {!userInfo && (
        <span className={styles.loginLink}>
          You must{' '}
          <Link to={`${ROUTES.login}?redirect=${pathname}`}>Login</Link> to
          write a review...
        </span>
      )}
      {userInfo && !userHasReviewed(reviews, userInfo._id) && (
        <>
          <h2>Write a Review:</h2>
          <div className={styles.reviewEditor}>
            {[...Array(5).keys()].map((iterator) => {
              const rat = iterator + 1
              return (
                <button
                  onClick={() => onStarButtonClick(rat)}
                  className={styles.starButton}
                  key={iterator}
                  type='button'
                  aria-label={`${rat} ${rat > 1 ? 'stars' : 'star'}`}
                >
                  {rating >= rat ? <FaStar /> : <FaRegStar />}
                </button>
              )
            })}
          </div>
          {showCommentSection && (
            <>
              <Input
                className={styles.textareaInput}
                inputProps={commentInputProps}
              />
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                onClick={onSubmit}
                large
              >
                SUBMIT
              </Button>
            </>
          )}
        </>
      )}
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className={styles.reviewContainer} key={review._id}>
            <span className={styles.name}>{review.name}</span>
            <div className={styles.starsContainer}>
              <Rating className={styles.stars} value={review.rating} />
              <span className={styles.date}>{parseDate(review.createdAt)}</span>
            </div>
            <p className={styles.comment}>{capitalize(review.comment)}</p>
          </div>
        ))
      ) : (
        <div className={styles.noReviews}>
          <FaStar />
          <h2>0 Reviews</h2>
        </div>
      )}
    </div>
  )
}

export default Reviews
