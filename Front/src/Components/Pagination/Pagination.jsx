import { Flex } from "@chakra-ui/react";
import React from "react";
import './Pagination.css'

// const Pagination = ({productsPerPage, totalProducts, currentPage, paginate, prevPage, nextPage}) => {
//     const pageNumbers = [];
  
//     for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
//         pageNumbers.push(i);
//     }

//     return (
//             <Flex justifyContent="center" alignItems="center" marginTop="50px" gap="20px" listStyleType="none">
//                 <li onClick={prevPage} className="page-number">{'<'}</li>
//                 {pageNumbers && pageNumbers.map((number) => (
//                     <li 
//                     key={number} 
//                     onClick={() => paginate(number)}
//                     className={'page-number ' + (number === currentPage ? 'active' : '')}>
//                         {number}
//                     </li>
//                 ))}
//                 <li onClick={nextPage} className="page-number">{'>'}</li>
//             </Flex>
//     )
// };
const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
    function handleNumberPage(totalPages, pageSelected) {
        createPagination(totalPages, pageSelected);
        paginate(pageSelected);
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }

    const createPagination = (totalPages, page = currentPage) => {
        let liTags = [];

        if (page > 1 && totalPages > 2) {
            liTags.push(
                <li className="prev" key="prev" onClick={(e) => { handleNumberPage(totalPages, page - 1) }}>
                    <span> <i className="fas fa-chevron-left"></i> {" Prev"} </span>
                </li>
            )
        }

        let beforePage = page === 1 ? 1 : page - 1;
        beforePage = (page === totalPages && totalPages > 3) ? page - 2 : beforePage;
        beforePage = (page === totalPages - 1 && totalPages > 3) ? page - 1 : beforePage;

        let afterPage = page === totalPages ? totalPages : page + 1;
        afterPage = (page === 1 && totalPages > 3) ? page + 2 : afterPage
        afterPage = (page === 2 && totalPages > 3) ? page + 1 : afterPage

        for (let i = beforePage; i <= afterPage; i++) {
            liTags.push(
                <li
                    className={`numb ${page === i ? "active" : ""}`}
                    key={i}
                    onClick={(e) => { handleNumberPage(totalPages, i) }}
                >
                    <span>{i}</span>
                </li>
            )
        }

        if (page < totalPages && totalPages > 2) {
            liTags.push(
                <li className="next" key="next" onClick={(e) => { handleNumberPage(totalPages, page + 1) }}>
                    <span> {"Next "} <i className="fas fa-chevron-right"></i> </span>
                </li>
            )
        }
        return liTags;
    }

    let totalNumberPages = Math.ceil(totalProducts / productsPerPage);
    return (
        totalNumberPages <= 1
        ? null
        :   <Flex justifyContent="center" alignItems="center" marginTop="50px" gap="20px" listStyleType="none" className="pagination_container">
                <ul>
                    {createPagination(totalNumberPages, currentPage)}
                </ul>
            </Flex>
    )
}


export default Pagination;