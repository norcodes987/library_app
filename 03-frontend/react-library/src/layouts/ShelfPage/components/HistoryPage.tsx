import { useOktaAuth } from '@okta/okta-react'
import React, { useEffect, useState } from 'react'
import HistoryModel from '../../../models/HistoryModel';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { base } from '../../Utils/constants';
import { Link } from 'react-router-dom';
import { Pagination } from '../../Utils/Pagination';

export const HistoryPage = () => {
    const {authState} = useOktaAuth();

    const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);
    const [httpError, setHttpError] = useState(null);

    //history
    const[histories, setHistories] = useState<HistoryModel[]>([]);

    //pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const reqOptions = (meth: string) => {
        return (
            {
                method: meth,
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    useEffect(() => {
        const fetchUserHistory = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${base}/histories/search/findBooksByUserEmail/?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage-1}&size=5`;
                
                const historyResponse = await fetch(url, reqOptions('GET'));
                if (!historyResponse.ok) {
                    throw new Error('Something went wrong');
                }
                const historyReponseJson = await historyResponse.json();
                setHistories(historyReponseJson._embedded.histories);
                setTotalPages(historyReponseJson.page.totalPages);
            }
            setIsLoadingHistory(false);
        }
        fetchUserHistory().catch((error: any) => {
            setIsLoadingHistory(false);
            setHttpError(error.message);
        })
    }, [authState, currentPage])

    if (isLoadingHistory) {
        return <SpinnerLoading />
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className='mt-2'>
        {histories.length > 0 ?
        <>
            <h5>Recent History: </h5>
            {histories.map(history => (
                <div key={history.id}>
                    <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
                        <div className='row g-0'>
                            <div className='col-md-2'>
                                <div className='d-none d-lg-block'>
                                    {history.img ?
                                        <img src={history.img} width='123' height='196' alt='Book' /> :
                                        <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} width='123' height='196' alt='Book' />
                                    }
                                </div>
                                <div className='d-lg-none d-flex justify-content-center align-items-center'>
                                    {history.img ?
                                        <img src={history.img} width='123' height='196' alt='Book' /> :
                                        <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} width='123' height='196' alt='Book' />
                                    }
                                </div>
                            </div>
                            <div className='col'>
                                <div className='card-body'>
                                    <h5 className='card-title'>{history.author}</h5>
                                    <h4>{history.title}</h4>
                                    <p className='card-text'>{history.description}</p>
                                    <hr />
                                    <p className='card-text'>Checked out on: {history.checkoutDate}</p>
                                    <p className='card-text'>Returned on: {history.returnedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </> : 
        <>
        <h3 className='mt-3'>Currently no history: </h3>
        <Link className='btn btn-primary' to={'search'}>
            Search for a new book
        </Link>
        </>
        }
         {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
    </div>
  )
}
