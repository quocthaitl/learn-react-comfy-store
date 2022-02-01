import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
	const { productsFiltered: products, viewGrid } = useFilterContext();
	if (products.length < 1) {
		return (
			<h5 style={{ textTransform: "none" }}>
				sorry, no products matched your search...
			</h5>
		);
	}

	if (!viewGrid) {
		return <ListView products={products} />;
	}
	return <GridView products={products} />;
};

export default ProductList;
