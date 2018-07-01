import React from 'react';
import {Storage} from "../../services/Storage";
import {Config} from "../../services/Config/index.js";
import {LocaleSwitcher} from "../../services/Config/components/LocaleSwitcher/index.js";
import {SearchService} from "../../services/Search/index.js";
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			config: Storage.get('app-config') || { config: {locale: 'en'} }
		};

		this.searchService = new SearchService(this.props.server_search);

		counterpart.setLocale(this.state.config.config.locale);
		this.updateConfigState = this.updateConfigState.bind(this);
	}

	updateConfigState(config) {
		this.setState({config});
	}


	inputOnFocus(e) {
		document.getElementById("search-menu").classList.remove("display-none");
	}
	inputOnFocusOut(e) {
		document.getElementById("search-menu").classList.add("display-none");
	}

	render() {
		return (
			<div>
				<Config updateConfigState={this.updateConfigState} config={this.state.config}>
					<LocaleSwitcher config={this.state.config} />
					<div className="logout-btn">
						<a href={this.props.logout_url}><Translate content="logout_btn" /></a>
					</div>
					<div className="search-wrapper">
						<img src="https://www.documaster.com/hubfs/Documaster-Jan2017/Images/logo.svg?t=1530269875029" alt="Documaster Logo" className="documaster-blue" />
						<input id="search-bar" type="text" onFocus={this.inputOnFocus} onBlur={this.inputOnFocusOut} placeholder={counterpart("drop_down_lbl")} onKeyUp={this.searchService.filterData}/>
						<SearchMenu searchService={this.searchService}/>
					</div>
				</Config>
			</div>
		)
	}
}

class SearchMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {}
		};

		this.populate = this.populate.bind(this);

		this.populate();
	}

	populate() {
		this.props.searchService.getData().then((data) => {
			this.setState({data: data});
		});
	}

	prepareLayers() {
		// Prepare search menu based on data
		var layers = "";
		let data = this.state.data;
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				layers += '<li className="layer1">';
				layers += "<a>" + data[key].classId + " " + data[key].title + "</a>"
				layers += "<ul>";
				let children = this.state.data[key].children;
				for (let child_key in children) {
					if (children.hasOwnProperty(child_key)) {
						layers += '<li className="layer2"><a>' + children[child_key].classId + " " + children[child_key].title + '</a></li>'
					}
				}
				layers += "</ul>";
				layers += '</li>';
			}
		}
		return layers;
	}

	render() {
		return(
			<div className="search-menu display-none" id="search-menu">
				<ul className="mainlayer" id="category1" dangerouslySetInnerHTML={{__html: this.prepareLayers()}}>
				</ul>
			</div>
		);
	}
}

export default App;
