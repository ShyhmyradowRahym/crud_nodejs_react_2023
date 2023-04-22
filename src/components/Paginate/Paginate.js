import React from 'react'
import ReactPaginate from 'react-paginate'

const Paginate = ({ dataPage, handlePageClick }) => {
    return (
        <ReactPaginate
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={dataPage}
            previousLabel="<"
            nextLabel=">"
            pageClassName="border hover:bg-gray-100 px-3 py-1 cursor-pointer"
            pageLinkClassName="m-0"
            previousClassName="border py-1 px-3 hover:bg-gray-100"
            previousLinkClassName=""
            nextLinkClassName="border px-3 py-1 flex hover:bg-gray-100"
            breakLabel="..."
            breakClassName="border px-3 py-1 hover:bg-gray-100"
            containerClassName="inline-flex justify-content-center p-2 bg-white "
            activeClassName="bg-indigo-600 text-white hover:bg-indigo-600"
        />
    )
}

export default Paginate
