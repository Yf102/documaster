import React from 'react';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import Select from 'react-select';

class LocaleSwitcher extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.config;
	}

	render() {
		return (
			<div className="language-wrapper">
				<label className="locale_switcher_lbl" htmlFor="locale_switcher"><Translate content="switch_locale" />:</label>
				<div className="lang-slider">
					<LangSlider config={this.props.config} handleChange={this.props.changeHandlers.changeLanguageHandler}/>
				</div>
			</div>
		);
	}
}

class LangSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.config;

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(selectedOption) {
		this.setState({ locale: selectedOption.value });
		// selectedOption can be null when the `x` (close) button is clicked
		this.props.handleChange(selectedOption);
	}

	render() {
		const languages = counterpart.getAvailableLocales();
		let options = [];
		languages.map((lang, i) => {
			let langVal = counterpart.translate('language', { locale: lang });
			options.push({value: lang, label: langVal, clearableValue: false})
		});

		return (
			<Select
				clearable={false}
				searchable={false}
				name="form-field-name"
				value={this.state.locale}
				onChange={this.handleChange}
				options={options}
			/>
		);
	}
}

export {LocaleSwitcher};
