import { renderHome } from "./index.js";
const HomeComponent = {
	render: () => {
		return `
     
      <div id="side-details">
          <h1>Details</h1>
          
          <div id="sub-details">
              <p>See transaction details by clicking on the View Details Button</p>
              
          </div>

          <div class="buttons">
              <button id="delete-btn">Delete Transaction</button>
              
          </div>
      </div>

  <div id="sidebar">
      <h1>Create</h1>

      <form id="sideform">
          <input type="text" name="title" required placeholder="Transaction Name">
          <textarea maxlength="200" name="body" required placeholder="Description (max characters:200)"></textarea>
          <select name="createselect" id="crtype">
              <option value="0" hidden>Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
          </select>
          <input type="number" name="amount" required placeholder="Input Amount $">
          <button>Create</button>
      </form>
  </div>
  
  
  <div class="froot">
      <p class="total"></p>
      <div class="subfroot">
          <select class="filter-type" name="filter-type">
              <option value="" hidden>Filter by type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
              <option value="">See All</option>
          </select>

          <button id= "addBtnBeta" class="button">Add transaction</button>
          <button id= "viewBtnBetas" class="button">Show Details Tab</button>
      </div>
  </div> 
  
  <div class="root">
      
  </div>
      `;
	},
};

const AboutComponent = {
	render: () => {
		return `
        <section>
          <h1>About</h1>
          <p>This is the about page</p>
        </section>
      `;
	},
};

const ContactComponent = {
	render: () => {
		return `
        <section>
          <h1>Contact</h1>
          <p>This is the contact page</p>
        </section>
      `;
	},
};

const ErrorComponent = {
	render: () => {
		return `
        <section>
          <h1>Error</h1>
          <p>This is just a testasdasdasdasd</p>
        </section>
      `;
	},
};

const routes = [
	{ path: "/", component: HomeComponent },
	{ path: "/about", component: AboutComponent },
	{ path: "/contact", component: ContactComponent },
];

const router = () => {
	// TODO: Get the current path
	// TODO: Find the component based on the current path
	const path = parseLocation();
	// console.log(path)
	// TODO: If there's no matching route, get the "Error" component
	const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
	// console.log(component.render())
	// TODO: Render the component in the "app" placeholder
	document.getElementById("sectionDiv").innerHTML = component.render();
	if (path === "/") {
		renderHome();
	}
};

const parseLocation = () => location.hash.slice(1).toLowerCase() || "/";

const findComponentByPath = (path, routes) =>
	routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, "gm"))) || undefined;

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

const sideDtls = document.getElementById("side-details");
