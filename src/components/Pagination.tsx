import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PageProps = {
    totalPost: number;
    postCount: number;
    pageCount: number;
    currentPage: number;
}

export default function Pagination({ totalPost, postCount, pageCount, currentPage }: PageProps) {
    const [firstPage, setFirstPage] = useState(1);
    const navigate = useNavigate();
    const totalPage = totalPost === 0 ? 1 : Math.ceil(totalPost / postCount);
    const noMorePrev = firstPage === 1;
    const noMoreNext = firstPage + pageCount - 1 >= totalPage;

    useEffect(() => {
        if (currentPage === firstPage + pageCount) {
            setFirstPage(prev => prev + pageCount);
        }
        if (currentPage < firstPage) {
            setFirstPage(prev => prev - pageCount)
        }
    }, [currentPage, pageCount, firstPage])

    return (
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm mr-4" aria-label="Pagination">
            <div className="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" onClick={() => !noMorePrev && navigate(`?page=${firstPage - 1}`)}>
                <span className="sr-only"  >Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
            </div>
            {
                [...Array(pageCount)].map((page, i) => (
                    <>
                        {firstPage + i <= totalPage && (
                            <div
                                key={i}
                                aria-current={firstPage + i === currentPage ? "page" : undefined}
                                className={
                                    `relative z-10 
                                    inline-flex 
                                    items-center 
                                    px-4 
                                    py-2 
                                    text-sm 
                                    font-semibold
                                    ${firstPage + i === currentPage ? "text-subColor" : "text-mainColor"}
                                    ring-1 
                                    ring-inset 
                                    ring-gray-300
                                    focus:z-20
                                    focus-visible:outline
                                    focus-visible:outline-2
                                    focus-visible:outline-offset-2
                                    focus-visible:outline-indigo-600
                                    cursor-pointer
                                   ${firstPage + i !== currentPage && "hover:bg-gray-50"}
                                    ${firstPage + i === currentPage ? "bg-mainColor" : "bg-white"}
                                    `
                                }
                                onClick={() => navigate(`?page=${firstPage + i}`)}
                            >
                                {firstPage + i}
                            </div >
                            //   <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</div>
                        )}
                    </>
                ))
            }
            <div className="relative inline-flex cursor-pointer items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" onClick={() => !noMoreNext && navigate(`?page=${firstPage + pageCount}`)} >
                <span className="sr-only" >Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
            </div>
        </nav >
    )
}
