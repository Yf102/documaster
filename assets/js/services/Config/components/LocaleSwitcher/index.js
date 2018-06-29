import React from 'react';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

class LocaleSwitcher extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.config;
	}

	render() {
		return (
			<div className="language-wrapper">
				<label htmlFor="locale_switcher"><Translate content="switch_locale" />:</label>
				<LangSlider config={this.props.config} handleChange={this.props.changeHandlers.changeLanguageHandler}/>
			</div>
		);
	}
}

class LangSlider extends React.Component {
	render() {
		const languages = counterpart.getAvailableLocales();
		return (
			<select id="locale_switcher" onChange={this.props.handleChange} value={this.props.config.locale}>
				{languages.map((lang, i) => {
					let langVal = counterpart.translate('language', { locale: lang });
					return <option key={i} value={lang}>{langVal}</option>;
				})}
			</select>
		);
	}
}

export {LocaleSwitcher};
