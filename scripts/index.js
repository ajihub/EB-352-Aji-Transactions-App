// import { createPost } from "./create.js";
// // console.log(createPost)

// // const form = document.querySelector('form');
// // form.addEventListener('submit', createPost);

// // import { showDetails } from "./show.js";

// // showDetails(id);

// // createPost = require('./create.js');
// // const form = document.querySelector('form');
// // form.addEventListener('submit', createPost);

// //get elements

// //event listeners

export const renderHome = async (type = "") => {
	const rootDiv = document.querySelector(".root");
	const frootDiv = document.querySelector(".froot");
	const dropdownS = document.querySelector(".filter-type");
	const totalText = document.querySelector(".total");

	const sideBar = document.getElementById("sidebar");
	const btnBeta = document.getElementById("addBtnBeta");

	const viewBtnBeta = document.getElementById("viewBtnBetas");
	const deleteBtn = document.getElementById("delete-btn");
	const sideDetails = document.getElementById("side-details");
	const subDetailscontainer = document.getElementById("sub-details");

	viewBtnBeta.addEventListener("click", (e) => {
		sideDetails.classList.toggle("active");
		e.target.innerText == "Hide Details Tab"
			? (e.target.innerText = "Show Details Tab")
			: (e.target.innerText = "Hide Details Tab");
	});

	dropdownS.addEventListener("change", (event) => {
		renderHome(event.target.value);
	});

	btnBeta.addEventListener("click", () => {
		sideBar.classList.toggle("active");
	});

	//functions
	const showDetails = async (buttoN) => {
		// console.log(buttoN)
		const id = buttoN.getAttribute("data-id");
		// console.log('this is id bro', id)
		const res = await fetch("http://localhost:8888/transactions/" + id);
		const transacData = await res.json();

		const template = `
        <h2>Title: ${transacData.name}</h2>
        <p>Description: ${transacData.description}</p>
        <p>This transaction is an ${transacData.type}</p>
        <p>Amount: $${transacData.amount}</p>
         `;

		subDetailscontainer.innerHTML = template;

		deleteBtn.addEventListener("click", async (e) => {
			const res = await fetch("http://localhost:8888/transactions/" + id, {
				method: "DELETE",
			});
			window.location.replace("/index.html");
		});
	};

	let endPoint = "http://localhost:8888/transactions";
	const res = await fetch(endPoint);
	const transacData = await res.json();

	let total = 0;
	let template = "";
	console.log("total", totalText);
	transacData
		.filter((data) => {
			if (type == "") {
				return data;
			} else if (data.type.includes(type)) {
				return data;
			}
		})
		.map((data) => {
			data.type == "Income"
				? (template += `<div class="transaction">`)
				: (template += `<div class="transaction expense">`);

			template += `
                <h2>${data.name}</h2>
                <p><small>${data.description.slice(0, 77)}</small></p>
                <h4 class="type">Type: ${data.type}</h4>
                <p>Amount: $${data.amount}</p>

                <button id="viewDetailsBeta" class="viewBtnBeta" data-id="${data.id}">View Details</button>
            </div>
        `;
			data.type == "Income" ? (total += data.amount) : (total -= data.amount);
		});

	total <= 0 ? totalText.classList.add("total", "negative") : totalText.classList.remove("negative");

	totalText.innerText = `Total: $${total}`;
	rootDiv.innerHTML = template;

	const detailBtn = document.querySelectorAll(".viewBtnBeta");
	detailBtn.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			showDetails(btn);
		});
	});
};

// window.addEventListener("DOMContentLoaded", () => renderHome());
