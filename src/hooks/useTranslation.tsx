// utils
import {showToast} from '../utils';

// environment variables
import {ENV} from '../../env';

export const useTranslation = () => {
  const translate = async (text: string): Promise<string | undefined> => {
    const data = {
      text: [text],
      target_lang: 'ES',
      source_lang: 'EN',
    };
    try {
      showToast({
        type: 'info',
        text1: 'Generating translation...',
      });
      const response = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `DeepL-Auth-Key ${ENV.DEEPL_AUTH_API_KEY}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result?.translations?.length > 0) {
        showToast({
          type: 'success',
          text1: 'Translation generated',
        });
        return result.translations[0].text;
      } else {
        showToast({
          type: 'error',
          text1: 'Error generating the translation',
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Error generating the translation',
      });
    }
  };

  return {translate};
};
