import { Flex } from "@chakra-ui/react";
import React from "react";
import './Pagination.css'

const Pagination = ({productsPerPage, totalProducts, currentPage, paginate, prevPage, nextPage}) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
            <Flex justifyContent="center" alignItems="center" marginTop="50px" gap="20px" listStyleType="none">
                <li onClick={prevPage} className="page-number">{'<'}</li>
                {pageNumbers && pageNumbers.map((number) => (
                    <li 
                    key={number} 
                    onClick={() => paginate(number)}
                    className={'page-number ' + (number === currentPage ? 'active' : '')}>
                        {number}
                    </li>
                ))}
                <li onClick={nextPage} className="page-number">{'>'}</li>
            </Flex>
    )
};

export default Pagination;