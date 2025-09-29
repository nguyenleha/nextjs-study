import { useMemo } from 'react'
import Image from 'next/image'
import prevArrow from '@/assets/images/pager/prev_arrow02.svg'
import prevArrowDisabled from '@/assets/images/pager/prev_arrow02_disabled.svg'

export type PaginationProps = {
    totalArticle: number
    currentPage: number
    pending?: boolean
    perPage?: number
    modelValue: (page: number) => void
}

export function Pagination({ totalArticle = 1, currentPage = 1, pending = false, perPage = 7, modelValue }: PaginationProps) {
    const isLastItemOfFirstBoardered = useMemo(() => {
        return currentPage === 3
    }, [currentPage])
    const isFirstItemOfLastBoardered = useMemo(() => {
        return currentPage === totalArticle - 2
    }, [currentPage, totalArticle])

    const threeLastPages = useMemo(() => {
        return [totalArticle - 2, totalArticle - 1, totalArticle]
    }, [totalArticle])

    const twoLastPages = useMemo(() => {
        return [totalArticle - 1, totalArticle]
    }, [totalArticle])
    const isLessthanSevenPages = useMemo(() => {
        return totalArticle <= perPage && totalArticle > 0
    }, [totalArticle, perPage])
    const isBoarderPagesSelected = useMemo(() => {
        return totalArticle > perPage && (currentPage <= 3 || (currentPage > totalArticle - 3 && totalArticle > 0)) && !isLastItemOfFirstBoardered && !isFirstItemOfLastBoardered
    }, [totalArticle, perPage, currentPage, isLastItemOfFirstBoardered, isFirstItemOfLastBoardered])

    const gotoPage = (page: number) => {
        if (!pending) {
            if (page === currentPage) {
                return
            }
            if (page === 0 || page === totalArticle + 1) {
                return
            }
            modelValue(page)
        }
    }

    return (
        <div className="pager_block">
            <div className="pager_main">
                {currentPage === 1 ? (
                    <a className="pager_prev_btn disabled">
                        <Image src={prevArrowDisabled} alt="prev" />
                    </a>
                ) : (
                    <a className="pager_prev_btn" onClick={() => gotoPage(currentPage - 1)}>
                        <Image src={prevArrow} alt="prev page" />
                    </a>
                )}

                {isLessthanSevenPages ? (
                    <ul className="pager_list">
                        {Array.from({ length: totalArticle }, (_, i) => i + 1).map((i) => (
                            <li key={i} className="pager_item">
                                <a className={`pager_link ${currentPage === i ? 'active' : ''}`} onClick={() => gotoPage(i)}>
                                    <span>{i}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : isBoarderPagesSelected ? (
                    <ul className="pager_list">
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
                            <li key={i} className="pager_item">
                                <a className={`pager_link ${currentPage === i ? 'active' : ''}`} onClick={() => gotoPage(i)}>
                                    <span>{i}</span>
                                </a>
                            </li>
                        ))}
                        <li className="pager_item">
                            <a className="pager_link">
                                <span>...</span>
                            </a>
                        </li>
                        {threeLastPages.map((i) => (
                            <li key={i} className="pager_item">
                                <a className={`pager_link ${currentPage === i ? 'active' : ''}`} onClick={() => gotoPage(i)}>
                                    <span>{i}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : isLastItemOfFirstBoardered ? (
                    <ul className="pager_list">
                        {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
                            <li key={i} className="pager_item">
                                <a className={`pager_link ${currentPage === i ? 'active' : ''}`} onClick={() => gotoPage(i)}>
                                    <span>{i}</span>
                                </a>
                            </li>
                        ))}
                        <li className="pager_item">
                            <a className="pager_link" onClick={() => gotoPage(4)}>
                                <span>4</span>
                            </a>
                        </li>
                        <li className="pager_item">
                            <a className="pager_link">
                                <span>...</span>
                            </a>
                        </li>
                        {twoLastPages.map((i) => (
                            <li key={i} className="pager_item">
                                <a className={`pager_link ${currentPage === i ? 'active' : ''}`} onClick={() => gotoPage(i)}>
                                    <span>{i}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : isFirstItemOfLastBoardered ? (
                    <ul className="pager_list">
                        {Array.from({ length: 2 }, (_, i) => i + 1).map((i) => (
                            <li key={i} className="pager_item">
                                <a className={`pager_link ${currentPage === i ? 'active' : ''}`} onClick={() => gotoPage(i)}>
                                    <span>{i}</span>
                                </a>
                            </li>
                        ))}
                        <li className="pager_item">
                            <a className="pager_link">
                                <span>...</span>
                            </a>
                        </li>
                        <li className="pager_item">
                            <a className="pager_link" onClick={() => gotoPage(totalArticle - 3)}>
                                <span>{totalArticle - 3}</span>
                            </a>
                        </li>
                        {threeLastPages.map((i) => (
                            <li key={i} className="pager_item">
                                <a className={`pager_link ${currentPage === i ? 'active' : ''}`} onClick={() => gotoPage(i)}>
                                    <span>{i}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="pager_list">
                        <li className="pager_item">
                            <a className="pager_link" onClick={() => gotoPage(1)}>
                                <span>1</span>
                            </a>
                        </li>
                        <li className="pager_item">
                            <a className="pager_link">
                                <span>...</span>
                            </a>
                        </li>
                        <li className="pager_item">
                            <a className="pager_link" onClick={() => gotoPage(currentPage - 1)}>
                                <span>{currentPage - 1}</span>
                            </a>
                        </li>
                        <li className="pager_item">
                            <a className="pager_link active">
                                <span>{currentPage}</span>
                            </a>
                        </li>
                        <li className="pager_item">
                            <a className="pager_link" onClick={() => gotoPage(currentPage + 1)}>
                                <span>{currentPage + 1}</span>
                            </a>
                        </li>
                        <li className="pager_item">
                            <a className="pager_link">
                                <span>...</span>
                            </a>
                        </li>
                        <li className="pager_item">
                            <a className="pager_link" onClick={() => gotoPage(totalArticle)}>
                                <span>{totalArticle}</span>
                            </a>
                        </li>
                    </ul>
                )}

                {currentPage === totalArticle ? (
                    <a className="pager_next_btn disabled">
                        <Image src={prevArrowDisabled} alt="next" />
                    </a>
                ) : (
                    <a className="pager_next_btn" onClick={() => gotoPage(currentPage + 1)}>
                        <Image src={prevArrow} alt="next" />
                    </a>
                )}
            </div>
        </div>
    )
}
