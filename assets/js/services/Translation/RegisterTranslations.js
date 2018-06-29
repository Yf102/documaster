/**
 * Created by Filip on 20-Apr-17.
 */

import counterpart from 'counterpart';
// Import translated json files
import translation_en from 'json-loader!./../../../i18n/lang-en.json';
import translation_bg from 'json-loader!./../../../i18n/lang-bg.json';
import translation_no from 'json-loader!./../../../i18n/lang-no.json';

let RegisterTranslations = {
	run () {
		// Register the translated json objects
		counterpart.registerTranslations('en', translation_en);
		counterpart.registerTranslations('bg', translation_bg);
		counterpart.registerTranslations('no', translation_no);
	}
};

export {RegisterTranslations}
