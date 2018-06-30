

class SearchService {
	constructor(server_search) {
		// this.server_search = server_search;
		this.server_search = "{{ path('server_search') }}";
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
			el.classList.remove("hide");
			el.classList.remove("show");

			
		}
		// $(".search-menu ul > li").removeClass("hide");
		// $(".search-menu ul > li").removeClass("show");
        //
		// $(".menu ul > li").each(function () {
		// 	if ($(this).text().search(new RegExp(filter, "i")) < 0 && !$(this).hasClass('show')) {
		// 		$(this).addClass('hide');
		// 	} else {
		// 		$(this).addClass('show');
		// 		$(this).find(' ul > li').addClass('show');
        //
		// 	}
		// });
	}
}

export { SearchService };
