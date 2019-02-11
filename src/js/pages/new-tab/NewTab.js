import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

import MarkdownRenderer from '../../components/markdown-renderer';
import Header from '../../components/header';
import Spinner from '../../components/spinner';
import Chip from '../../components/chip';
import Footer from '../../components/footer';

import {fetchRandomSnippet} from '../../api/snippets';
import {restoreFromStorage} from '../../api/storage';

import './NewTab.css';

const CLASS = 'sok-NewTab';

export const THEMES_VARIANTS = {
	dark: 'dark',
	light: 'light',
};

class NewTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			snippet: null,
			language: null,
		};
	}

	componentDidMount() {
		this.setColorScheme();
		this.fetchSnippet();
	}

	setColorScheme = async () => {
		const options = await restoreFromStorage();
		const {theme} = options;

		if (theme === THEMES_VARIANTS.light) {
			require('../../../css/themes/light.css');
		} else {
			require('../../../css/themes/dark.css');
		}
	};

	fetchSnippet = async () => {
		const data = await fetchRandomSnippet();
		const {snippet, language} = data;

		this.setState({
			snippet,
			language,
		});
	};

	renderSnippet = () => {
		const {snippet, language} = this.state;

		if (!snippet) {
			return null;
		}

		return <MarkdownRenderer lang={language} source={this.state.snippet} />;
	};

	renderSpinner = () => {
		const {snippet} = this.state;

		if (snippet) {
			return null;
		}

		return <Spinner />;
	};

	renderLangChip = () => {
		const {language} = this.state;

		if (!language) {
			return null;
		}

		return <Chip value={language} />;
	};

	render() {
		return (
			<div className={CLASS}>
				{this.renderSpinner()}
				<Header />
				<span className={`${CLASS}-contentContainer`}>
					{this.renderLangChip()}
					{this.renderSnippet()}
				</span>
				<Footer />
			</div>
		);
	}
}

export default hot(module)(NewTab);