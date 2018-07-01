

class SearchService {
	constructor(server_search) {
		// this.server_search = server_search;
		this.server_search = server_search;
		this.data = null;
	}

	getData() {
		return new Promise((resolve, reject) => {
			let req = new XMLHttpRequest();
			req.open("GET", this.server_search);
			req.onload = () => {
				let resp = JSON.parse(req.response);
				if (resp.status === 200) {
					this.data = resp.data;
					resolve(resp.data);
				} else {
					reject(new Error("[ERROR] Could not get searched data"));
				}
			};
			req.send();
		});
	}

	filterData(e) {
		let filter = e.target.value;
		let li_els = document.querySelectorAll(".search-menu ul > li");

		for(let i = 0; i < li_els.length; i++) {
			let el = li_els[i];
			el.classList.remove("display-none");

			if(el.textContent.search(new RegExp(filter, "i")) < 0) {
				el.classList.add("display-none");
			} else {
				el.classList.remove("display-none");

				let childEls = el.querySelectorAll("ul > li");
				for(let j = 0; j < childEls.length; j++) {
					childEls[j].classList.remove("display-none");
				}
			}
		}
	}
}

export { SearchService };
