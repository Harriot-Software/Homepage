/**************************************************************************************************
 *                                                                                                *
 *                       This file is subject to the terms and conditions                         *
 *                       defined in file 'LICENSE.txt', which is located                          *
 *                       in the source code package of this file.                                 *
 *                                                                                                *
 *                       Copyright (c) 2020 Harriot Software.                                     *
 *                                                                                                *
 **************************************************************************************************/

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