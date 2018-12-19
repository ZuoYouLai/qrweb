import en from './en_US'
import zh from './zh_CN'

class Strings {
    constructor() {
        this.getLocalStrings()
    }

    getLocalStrings() {
        const language = navigator.language || navigator.browserLanguage;
        this.setLocale(language.split('-')[0] === 'en' ? 'en_US' : 'zh_CN')
    }

    setLocale(locale) {
        if (locale === 'en_US') {
            this.locale = 'en_US'
            this.stringSet = en
        } else {
            this.locale = 'zh_US'
            this.stringSet = zh
        }
    }

    getLocale() {
        return this.locale
    }

    getString(key, ...pattern) {
        let result = this.stringSet[key] || key;
        if (pattern.length == 0) {
            return result;
        }
        return result.replace(/{(\d+)}/g, (match, number) => pattern[number] !== undefined ? pattern[number] : match)
    }

    renderTemplateString(template) {
        const args = Array.prototype.slice.call(arguments, 1);
        return this.getString(template).replace(/{(\d+)}/g, (match, number) => {
            return typeof args[number] != 'undefined' ? args[number] : match
        })
    }
}

const strings = new Strings()
export default strings