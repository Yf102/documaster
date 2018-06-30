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

						<div className="search-menu display-none" id="search-menu">
							<ul className="mainlayer" id="category1">
								<li className="layer1"><a>item1</a>
									<ul>
										<li className="layer2">hju11</li>
										<li className="layer2"><a>kiu12</a></li>
									</ul>
								</li>
								<li className="layer1"><a>item2</a></li>
								<li className="layer1"><a> item3</a></li>
							</ul>
						</div>
					</div>
				</Config>
			</div>
		)
	}
}

export default App;
