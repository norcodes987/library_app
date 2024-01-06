import React, { useEffect, useState } from 'react'
import ReviewModel from '../../../models/ReviewModel'
import { base } from '../../Utils/constants';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { Review } from '../../Utils/Review';
import { Pagination } from '../../Utils/Pagination';

export const ReviewListPage = () => {
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState();

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const bookId = (window.location.pathname).split('/')[2];
    
    //fetch book reviews
    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${base}/reviews/search/findByBookId?bookId=${bookId}&page=${currentPage-1}&size=${reviewsPerPage}`;
            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error("Something went wrong!");
            }
            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;

            setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
            setTotalPages(responseJsonReviews.page.totalPages);

            const loadedReviews: ReviewModel[] = [];
           
            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription
                });
            }

            setReviews(loadedReviews);
            setIsLoading(false);
        }
        fetchBookReviews().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [currentPage])

    if (isLoading) {
        return (<SpinnerLoading />)
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastReview: number = currentPage * reviewsPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;
    
    let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ? reviewsPerPage * currentPage : totalAmountOfReviews;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='container m-5'>
        <div>
            <h3>Comments: ({reviews.length})</h3>
        </div>
        <p>
            {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items:
        </p>
        <div className='row'>
            {reviews.map(review => (
                <Review review={review} key={review.id} />
            ))}
        </div>

        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
    </div>
  )
}
