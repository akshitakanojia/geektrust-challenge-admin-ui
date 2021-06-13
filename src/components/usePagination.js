import { useState } from "react";

function usePagination(intitialData, itemsPerPage) {
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState(intitialData)
	const [maxPage, setMaxPage] = useState(Math.ceil(data.length / itemsPerPage));

	function currentData() {
		// Math.min(currentPage,maxPage)
		const begin = (currentPage - 1) * itemsPerPage;
		const end = begin + itemsPerPage;
		return data.slice(begin, end);
	}

	function next() {
		setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
	}

	function prev() {
		setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
	}

	function jump(page) {
		const pageNumber = Math.max(1, page);
		setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
	}

	return { next, prev, jump, currentData, currentPage, maxPage, setData, setCurrentPage, setMaxPage };
}

export default usePagination;