import React from 'react';
import counterpart from 'counterpart';
import {Storage} from '../../services/Storage/index.js';

const CONFIG_STORAGE_KEY = 'app-config';

class Config extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.config;
		this._save();
		counterpart.setLocale(this.get("locale"));

		this.handleChangeSetting = this.handleChangeSetting.bind(this);
	}

	// Get config value for key
	get(key) {
		return this.state.config[key];
	}

	// Save config to storage
	_save() {
		Storage.set(CONFIG_STORAGE_KEY, this.state);
	}

	// Set config key value
	set(key, value) {
		let config = this.state.config;
		config[key] = value;
		this.setState({config: config}, () => {
			this._save();
		});
	}

	handleChangeSetting(e, setting) {
		let previous = this.state.config[setting];
		let value = e.target.options[e.target.selectedIndex].value;
		let config = this.state.config;
		if (previous != value) {
			config[setting] = value;
			this.setState({config: config},  () => {
				this._save();
			});
			this.props.updateConfigState({config: config});
			if(setting === "locale") {
				counterpart.setLocale(value);
			}
		}
		return previous;
	}

	render() {
		return (
			<div className={"config-wrapper"}>
				{
					this.props.children.map((child, i) => {
						if(child.type === 'div') {
							return child;
						}

						return React.cloneElement(child, {
							key: i,
							config: this.state.config,
							changeHandlers: {
								changeLanguageHandler: (e) => this.handleChangeSetting(e, "locale")
							}
						});
					})
				}
			</div>
		);
	}
}

export {Config};
