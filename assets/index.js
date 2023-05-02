const products = await (await fetch(`/assets/data/products.json`)).json();
const productsById = products.reduce((productsById, product) => {
	productsById[product.name] = product;
	return productsById;
}, {});

const $cartCounter = document.querySelector(`[data-cart-counter]`);
const $buttonAtcs = Array.from(document.querySelectorAll(`[data-product-add]`));

for (const $buttonAtc of $buttonAtcs) {
	$buttonAtc.addEventListener(`click`, handleAtc);
}

const cart = doTry(() => JSON.parse(localStorage.getItem(`cart`))) || {};
setCartCount();

function doTry(callback, catcher) {
	try {
		return callback();
	} catch {
		return catcher;
	}
}

function handleAtc(event) {
	const $button = event.currentTarget;
	if ($button.getAttribute(`disabled`) === `disabled`) {
		return;
	}

	const productName = $button.getAttribute(`data-product-add`);
	$button.setAttribute(`disabled`, `disabled`);

	setTimeout(() => {
		$button.removeAttribute(`disabled`);
		cart[productName] = (cart[productName] || 0) + 1;
		localStorage.setItem(`cart`, JSON.stringify(cart));
		setCartCount();
	}, 800);
}

function setCartCount() {
	const cartCount = products.reduce((cartCount, product) => {
		return cartCount + (cart[product.name] || 0);
	}, 0);
	$cartCounter.textContent = cartCount === 0 ? '' : cartCount;
}
