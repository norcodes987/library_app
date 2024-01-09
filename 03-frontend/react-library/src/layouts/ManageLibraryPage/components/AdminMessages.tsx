import { useOktaAuth } from '@okta/okta-react'
import React, { useEffect, useState } from 'react'
import MessageModel from '../../../models/MessageModel';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { base } from '../../Utils/constants';
import { Pagination } from '../../Utils/Pagination';
import { AdminMessage } from './AdminMessage';
import AdminMessageRequest from '../../../models/AdminMessageRequest';

export const AdminMessages = () => {
    const {authState} = useOktaAuth();

    const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(true);
    const [httpError, setHttpError] = useState(null);

    //messages
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messagesPerPage] = useState<number>(5);

    //pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    //recall useeffect
    const [btnSubmit, setBtnSubmit] = useState<boolean>(false);

    const reqOptions = (meth: string, bodyReq?: any) => {
        return {
            method: meth,
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                 'Content-Type': 'application/json'
            },
            body: bodyReq
        };
    }

    useEffect(() => {
        const fetchUserMessages = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${base}/messages/search/findByClosed/?closed=false&page=${currentPage-1}&size=${messagesPerPage}`;
                
                const messagesResponse = await fetch (url, reqOptions('GET'));
                if (!messagesResponse.ok) {
                    throw new Error ('Something went wrong')
                }
                const messagesResponseJson = await messagesResponse.json();

                setMessages(messagesResponseJson._embedded.messages);
                setTotalPages(messagesResponseJson.pages.totalPages);
            }
            setIsLoadingMessages(false);
        }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.messages);
        })
        window.scrollTo(0,0);
    }, [authState, currentPage, btnSubmit])

    if (isLoadingMessages) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    async function submitResponseToQuestion(id: number, response: string) {
        const url = `${base}/messages/secure/admin/message`;
        if (authState && authState?.isAuthenticated && id !== null  && response !== '') {
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response);
            const messageAdminRequestModelResponse = await fetch(url, reqOptions('PUT', JSON.stringify(messageAdminRequestModel)));

            if (!messageAdminRequestModelResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setBtnSubmit(!btnSubmit);
        }
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='mt-3'>
        {messages.length > 0 ? 
        <>
            <h5>Pending Q/A</h5>
            {messages.map(messages => (
                <AdminMessage message={messages} key={messages.id} submitResponseToqQuestion={submitResponseToQuestion} />
            ))}
        </>
        :
        <h5>No pending Q/A</h5>
        }
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
    </div>
  )
}
