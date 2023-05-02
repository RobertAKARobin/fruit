const products = await (await fetch(`/assets/data/products.json`)).json();
const productsById = products.reduce((productsById, product) => {
	productsById[product.name] = product;
	return productsById;
}, {});
console.log(productsById);

const $cartCounter = document.querySelector(`[data-cart-counter]`);
const $buttonAtcs = Array.from(document.querySelectorAll(`[data-product-add]`));

for (const $buttonAtc of $buttonAtcs) {
	$buttonAtc.addEventListener(`click`, handleAtc);
}

function handleAtc(event) {
	const $button = event.currentTarget;
	const productName = $button.getAttribute(`data-product-add`);
	console.log(productName);
}
