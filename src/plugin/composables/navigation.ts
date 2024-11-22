import {
	UseHandleJumpAhead,
	UseHandleNonJumpAhead,
} from '../types';


const useHandleJumpAhead: UseHandleJumpAhead = (options) => {
	const { currentPageEditable,
		currentPageIdx,
		firstNonEditableIndex,
		lastNonEditableIndex,
		lastPageIdx,
		nextPageEditable,
		nextPageNotEditable,
		pageIdx,
		pageNotEditable,
		previousPageEditable,
		previousPageNotEditable } = options;

	// If the page is before the last non editable page //
	if (pageIdx > lastNonEditableIndex) {

		// If the current page is after the last non editable page //
		if (currentPageIdx > lastNonEditableIndex) {
			// console.log('f1', page.title, pageIdx, currentPageIdx);
			return true;
		}

		// console.log('f', page.title, pageIdx, currentPageIdx);
		return false;
	}

	// If the page is equal to the last non editable page //
	if (pageIdx === lastNonEditableIndex) {
		// console.log('g', page.title, pageIdx, currentPageIdx);
		return false;
	}

	// If the page is before the last non editable page //
	if (pageIdx < lastNonEditableIndex) {

		// If the current page is equal to the last page //
		if (currentPageIdx === lastPageIdx) {
			return false;
		}

		// If the current page is after the first non editable page //
		if (pageIdx > firstNonEditableIndex) {

			// If the current page is editable and the next page is editable //
			if (currentPageEditable && nextPageEditable) {
				// console.log('j-3', page.title, pageIdx, currentPageIdx);
				return true;
			}

			/**
			 * If the current page is editable
			 * And the next page is not editable
			 * And the page is after the first non editable page
			 * And the page is after the current page
			 */
			if (
				currentPageEditable &&
				nextPageNotEditable &&
				pageIdx > firstNonEditableIndex &&
				currentPageIdx > firstNonEditableIndex &&
				pageIdx > currentPageIdx
			) {
				// console.log('j-3-1', page.title, pageIdx, currentPageIdx);
				return true;
			}

			// console.log('j-4', page.title, pageIdx, currentPageIdx);
			return false;
		}
	}

	// If the page is after than the first non editable page //
	if (pageIdx > firstNonEditableIndex) {

		// If the current page is before or equal to the first non editable page //
		if (currentPageIdx <= firstNonEditableIndex) {
			// console.log('e-2', page.title, pageIdx, currentPageIdx);
			return false;
		}

		// console.log('e', page.title, pageIdx, currentPageIdx);
		return true;
	}

	/**
	 * If the page is before the first non editable page
	 * And the current page is before or equal to the first non editable page
	 */
	if (pageIdx < firstNonEditableIndex && currentPageIdx <= firstNonEditableIndex) {
		// console.log('e-3', page.title, pageIdx, currentPageIdx);
		return true;
	}

	/**
	 * If the current page is before the page
	 * And the page is before or equal to the first non editable page
	 */
	if (currentPageIdx > pageIdx && pageIdx <= firstNonEditableIndex) {
		// console.log('e-4', page.title, pageIdx, currentPageIdx);
		return false;
	}

	// If the page is before the current page //
	if (pageIdx < currentPageIdx) {
		// console.log('h', page.title, pageIdx, currentPageIdx);
		return true;
	}

	// If the page is not editable //
	if (pageNotEditable) {
		// console.log('i', page.title, pageIdx, currentPageIdx);
		return false;
	}

	// If the current page is before or equal to the page //
	if (currentPageIdx <= pageIdx) {

		// If the page is before the first non editable page //
		if (pageIdx < firstNonEditableIndex) {
			return false;
		}

		return true;
	}

	/**
	 * If the current page is after the page
	 * And the previous page is editable
	 */
	if (currentPageIdx >= pageIdx && previousPageEditable) {
		// console.log('currentPageIdx >= pageIdx', page.title, pageIdx, currentPageIdx);
		return true;
	}

	// If the next or previous page is not editable //
	if (nextPageNotEditable || previousPageNotEditable) {
		return false;
	}

	return false;
};

const useHandleNonJumpAhead: UseHandleNonJumpAhead = (options) => {
	const { currentPageEditable,
		currentPageIdx,
		firstNonEditableIndex,
		lastNonEditableIndex,
		lastPageIdx,
		nextPageEditable,
		nextPageNotEditable,
		pageEditable,
		pageIdx,
		pageNotEditable } = options;
	// If page is before the current page //
	if (pageIdx < currentPageIdx) {

		// If the current page is before the last non editable page //
		if (currentPageIdx > lastNonEditableIndex) {

			/**
			 * If the page is before the first non editable page
			 * And the page is before the last non editable page
			 * And the current page is the last page
			 * And the page is editable
			 */
			if (
				pageIdx > firstNonEditableIndex &&
				pageIdx > lastNonEditableIndex &&
				currentPageIdx === lastPageIdx &&
				pageEditable
			) {
				// console.log('d', page.title, pageIdx, currentPageIdx);
				return true;
			}

			// If the page is not editable //
			if (!pageEditable) {
				// console.log('aa', page.title, pageIdx, currentPageIdx);
				return false;
			}
		}

		/**
		 * If the page is before the first non editable page
		 * And the current page is before or equal to the first non editable page
		 */
		if (pageIdx < firstNonEditableIndex && currentPageIdx <= firstNonEditableIndex) {
			// console.log('ab', page.title, pageIdx, currentPageIdx);
			return true;
		}
	}

	/**
	* If the page is before or equal to the first non editable page
	* And the current page is editable
	*/
	if (pageIdx <= firstNonEditableIndex && currentPageEditable) {
		// console.log('ac', page.title, pageIdx, currentPageIdx);
		return false;
	}

	// If the page is before the current page //
	if (pageIdx < currentPageIdx) {

		/**
		 * If the page is after the first non editable page
		 * And the page is before the last non editable page
		 * And the current page is before or equal to the last non editable page
		 * And the next page is not editable
		 * And the page is editable
		 */
		if (
			pageIdx > firstNonEditableIndex &&
			pageIdx < lastNonEditableIndex &&
			currentPageIdx <= lastNonEditableIndex &&
			nextPageNotEditable &&
			pageEditable
		) {
			// console.log('ad', page.title, pageIdx, currentPageIdx);
			return true;
		}

		/**
		 * If the page is before the last non editable page
		 * And the page is not editable
		 */
		if (pageIdx < lastNonEditableIndex && pageNotEditable) {
			// console.log('ae', page.title, pageIdx, currentPageIdx);
			return false;
		}

		/**
		 * If the page is before the first non editable page
		 * And the next page is editable
		 * And the current page is not the last page
		 */
		if (
			pageIdx > firstNonEditableIndex &&
			nextPageEditable &&
			currentPageIdx !== lastPageIdx
		) {
			// console.log('af', page.title, pageIdx, currentPageIdx);
			return true;
		}
	}

	return false;
};


export {
	useHandleJumpAhead,
	useHandleNonJumpAhead,
};
