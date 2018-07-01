class Storage {
	static set(key, value) {
		if(typeof localStorage !== "undefined") {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}

	static get(key) {
		return JSON.parse(typeof localStorage !== "undefined" ? localStorage.getItem(key) : null);
	}
}

export {Storage}
