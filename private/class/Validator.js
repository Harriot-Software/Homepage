class Validator {

    static constants = require('../files/constants');

    /**
     * Validate body of email body
     * @param body
     * @returns {boolean}
     * @constructor
     */
    static ValidateEmailBody(body) {
        const max_length = this.constants.EMAIL_BODY_MAX_LENGTH;
        const min_length = this.constants.EMAIL_BODY_MIN_LENGTH;

        return this.ValidateGenericField(body, max_length, min_length)
    }

    /**
     * Validate email address
     * @param address
     * @param max_length
     * @param min_length
     * @returns {boolean|*}
     * @constructor
     */
    static ValidateEmailAddress(address, max_length = false, min_length = false) {

        if (!max_length) { max_length = this.constants.EMAIL_ADDRESS_MAX_LENGTH; }
        if (!min_length) { min_length = this.constants.EMAIL_ADDRESS_MIN_LENGTH; }

        if (address.length <= max_length && address.length > min_length) {

            return address.match(this.constants.EMAIL_ADDRESS_REGEX);

        } else { return false; }

    }

    static ValidateGenericField(data, max_length = false, min_length = false) {

        if (!max_length) { max_length = this.constants.GENERIC_FIELD_MAX_LENGTH; }
        if (!min_length) { min_length = this.constants.GENERIC_FIELD_MIN_LENGTH; }

        return data.length <= max_length && data.length > min_length;
    }

}

module.exports = Validator;