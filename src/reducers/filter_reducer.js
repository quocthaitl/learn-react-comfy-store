import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		let maxPrice = action.payload.map((product) => product.price);
		maxPrice = Math.max(...maxPrice);
		return {
			...state,
			productsAll: [...action.payload],
			productsFiltered: [...action.payload],
			filters: { ...state.filters, maxPrice, price: maxPrice },
		};
	}

	if (action.type === SET_GRIDVIEW) {
		return { ...state, viewGrid: true };
	}

	if (action.type === SET_LISTVIEW) {
		return { ...state, viewGrid: false };
	}

	if (action.type === UPDATE_SORT) {
		return { ...state, sort: action.payload };
	}

	if (action.type === SORT_PRODUCTS) {
		const { sort, productsFiltered } = state;
		let productsTemp = [...productsFiltered];

		if (sort === "price-lowest") {
			productsTemp = productsTemp.sort((a, b) => a.price - b.price);
		}

		if (sort === "price-highest") {
			productsTemp = productsTemp.sort((a, b) => b.price - a.price);
		}

		if (sort === "name-a") {
			productsTemp = productsTemp.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
		}

		if (sort === "name-z") {
			productsTemp = productsTemp.sort((a, b) => {
				return b.name.localeCompare(a.name);
			});
		}

		return { ...state, productsFiltered: productsTemp };
	}

	if (action.type === UPDATE_FILTERS) {
		const { name, value } = action.payload;
		return { ...state, filters: { ...state.filters, [name]: value } };
	}

	if (action.type === FILTER_PRODUCTS) {
		console.log("filtering products");
		return { ...state };
	}

	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			filters: {
				...state.filters,
				text: "",
				company: "all",
				category: "all",
				color: "all",
				price: state.filters.maxPrice,
				freeShipping: false,
			},
		};
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
