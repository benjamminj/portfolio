import { ReactNode, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

const SCROLL_DEBOUNCE_TIME = 200;

interface GetPartialPageHeightArguments {
	items: number;
	itemsPerPage: number;
	rowHeight: number;
	columns: number;
	offsetY: number;
}

/**
 * Utility function to return the height of the final page. Within the list of
 * items, the final page sometimes can be a partial page.
 *
 * This function figures out how many rows of items exist on the final page
 * of the list and returns the calculated height of the page.
 */
const getPartialPageHeight = ({
	items,
	itemsPerPage,
	rowHeight,
	columns,
	offsetY
}: GetPartialPageHeightArguments) => {
	const numberOfPages = items / itemsPerPage;
	const completePages = Math.floor(numberOfPages);

	if (completePages === numberOfPages) {
		const rows = itemsPerPage / columns;
		return rows * rowHeight;
	}

	const lastPageStartIndex = completePages * itemsPerPage - 1;
	const itemsOnLastPage = items - lastPageStartIndex - 1;
	const lastPageRows = Math.ceil(itemsOnLastPage / columns);

	return lastPageRows * rowHeight + offsetY;
};

/**
 * Given an HTML element and the static height of each page, determine which
 * page index the user is currently scrolled on.
 *
 * For the purposes of this function, the user is scrolled on a page once the page
 * has intersected with the TOP of the window. This is an explicit trade-off for
 * the sake of simplicity.
 */
const getCurrentScrollPage = (wrapper: HTMLElement, pageHeight: number) => {
	const wrapperScrollOffset = wrapper.offsetTop;
	const scrollPosition = window.scrollY;

	const currentScrollPage = Math.floor((scrollPosition - wrapperScrollOffset) / pageHeight);

	return Math.max(currentScrollPage, 0);
};

interface VirtualizedListPageProps {
	children: ReactNode;
	pagesBefore: number;
	pageHeight: number;
	lastPageHeight: number;
	isLastPage?: boolean;
	className?: string;
	offsetY?: number;
}

/**
 * A single "page" of items within the virtual list. Each page will be absolutely
 * positioned based on its index and toggled based on the current scroll position.
 */
const VirtualizedListPage = ({
	children,
	pagesBefore,
	pageHeight,
	className,
	isLastPage = false,
	lastPageHeight,
	offsetY = 0
}: VirtualizedListPageProps) => {
	const height = isLastPage ? lastPageHeight : pageHeight;
	return (
		<div
			className={className}
			style={{
				position: 'absolute',
				top: pagesBefore * pageHeight,
				height: height + offsetY,
				marginBottom: -1 * offsetY,
				overflow: 'hidden',
				width: '100%',
				boxSizing: 'border-box'
			}}
		>
			{children}
		</div>
	);
};

interface VirtualizedListProps {
	renderPage: (index: number) => ReactNode;
	items: number;
	itemsPerPage: number;
	/**
	 * Number of columns per row in the page. This allows you to create grids with
	 * your items and dynamically size the item widths. Defaults to `1`
	 */
	columns?: number;
	rowHeight: number;
	pageOffsetY?: number;
}

/**
 * Renders a virtualized list.
 *
 * The primary reason for using a virtualized list is _performance_—rendering large
 * lists of items throws a ton of elements into the DOM.
 *
 * While rendering 20-50 elements doesn't result in degraded performance, you might
 * start to see dropped frames around 100-200 items, and the browser can potentially
 * crash when you render 1,000+ items.
 *
 * This virtualized list using a technique called "windowing". For further reading
 * on windowing techniques check out https://web.dev/virtualize-long-lists-react-window/.
 */
export const VirtualizedList = ({
	renderPage,
	columns = 1,
	rowHeight,
	items,
	itemsPerPage,
	pageOffsetY = 0
}: VirtualizedListProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [currentPageIndex, setCurrentPageIndex] = useState(0);

	const pages = Math.ceil(items / itemsPerPage);

	const rowsPerPage = itemsPerPage / columns;
	const pageHeight = rowsPerPage * rowHeight + pageOffsetY;
	const lastPageStartIndex = pages - 1;

	// Since the last page can be a partial page, determine its height separately
	// from the rest.
	const lastPageHeight = getPartialPageHeight({
		items,
		itemsPerPage,
		columns,
		rowHeight,
		offsetY: pageOffsetY
	});

	const pagesBefore = currentPageIndex;
	const pagesAfter = lastPageStartIndex - currentPageIndex;

	// NOTE: it's important to figure out the current page based on SCROLL POSITION
	// rather than attempting to use an IntersectionObserver.
	//
	// Using an IntersectionObserver worked when scrolling slowly, but it didn't
	// correctly toggle pages when scrolling quickly or when scrubbing the scroll bar.
	// This is because you skip right past the entire IntersectionObserver and
	// immediately scroll into empty space.
	useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;

		const handleScroll = debounce(() => {
			const currentScrollPage = getCurrentScrollPage(wrapper, pageHeight);
			setCurrentPageIndex(currentScrollPage);
		}, SCROLL_DEBOUNCE_TIME);

		window.addEventListener('scroll', handleScroll, { passive: false });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [pageHeight]);

	return (
		<>
			<div
				ref={wrapperRef}
				style={{
					position: 'relative',
					overflow: 'hidden',
					marginBottom: pageOffsetY * -1,
					paddingBottom: pageOffsetY,
					height: lastPageStartIndex * pageHeight + lastPageHeight
				}}
			>
				{pagesBefore > 0 && (
					<VirtualizedListPage
						pageHeight={pageHeight}
						lastPageHeight={lastPageHeight}
						pagesBefore={pagesBefore - 1}
						offsetY={pageOffsetY}
					>
						{renderPage(currentPageIndex - 1)}
					</VirtualizedListPage>
				)}

				<VirtualizedListPage
					pagesBefore={pagesBefore}
					pageHeight={pageHeight}
					isLastPage={currentPageIndex === lastPageStartIndex}
					lastPageHeight={lastPageHeight}
					offsetY={pageOffsetY}
				>
					{renderPage(currentPageIndex)}
				</VirtualizedListPage>

				{pagesAfter > 0 && (
					<VirtualizedListPage
						pageHeight={pageHeight}
						isLastPage={currentPageIndex + 1 === lastPageStartIndex}
						lastPageHeight={lastPageHeight}
						pagesBefore={pagesBefore + 1}
						offsetY={pageOffsetY}
					>
						{renderPage(currentPageIndex + 1)}
					</VirtualizedListPage>
				)}
			</div>
		</>
	);
};
