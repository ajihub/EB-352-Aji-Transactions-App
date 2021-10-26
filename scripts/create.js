export const createPost = async (e) => {
	const form = document.querySelector("form");
	console.log(form);
	e.preventDefault();

	const doc = {
		name: form.title.value,
		description: form.body.value,
		type: form.createselect.value,
		amount: parseInt(form.amount.value),
	};

	await fetch("http://localhost:3000/transactions", {
		method: "POST",
		body: JSON.stringify(doc),
		headers: { "Content-Type": "application/json" },
	});
	window.location.href = "/";
};