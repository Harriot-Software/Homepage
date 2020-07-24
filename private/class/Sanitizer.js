const sanitizehtml = require('sanitize-html');

module.exports = {

    sanitizehtml,

    optionConfig:  {

        sanitizeAll: {
            allowedTags: [],
            allowedAttributes: {},
            disallowedTagsMode: 'recursiveEscape'
        }

    }
};