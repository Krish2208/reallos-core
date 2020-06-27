/**
 * List of maps containing user roles in the form:
 * 
 * ```
 * {value: '...', label: '...'}
 * ```
 */
export const USER_ROLES = [
    {value: 'buyer', label: 'Buyer'},
    {value: 'seller', label: 'Seller'},
    {value: 'buyer-agent', label: 'Buyer Agent'},
    {value: 'seller-agent', label: 'Seller Agent'},
    {value: 'title-agent', label: 'Title Agent'},
    {value: 'escrow-agent', label: 'Escrow Agent'},
    {value: 'home-inspector', label: 'Home Inspector'}
]

/**
 * Returns role label of a user based on `roleValue`
 * 
 * @param {"buyer" | "seller" | "buyer-agent" | "seller-agent" | "title-agent" | "escrow-agent" | "home-inspector"} roleValue 
 * Role Value
 * 
 * @returns {string}
 * Role label
 */
export const getRoleLabel = (roleValue) => {
    let roleLabel = null;

    USER_ROLES.map(role => {
        if (role.value == roleValue) {
            roleLabel = role.label;
        }
    });

    return roleLabel;
}

/**
 * Regex to validate email.
 */
export const emailValidationRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/**
 * Regex to validate phone number.
 */
export const phoneNumberValidationRegex = /^[0-9]{10}$/;

/**
 * Validates a form field value based on the type
 * of field.
 * 
 * @param {string} textValue
 * The value to validate.
 * 
 * @param {"name" | "role" | "email" | "phone" | "password"} fieldType
 * Type of form field that needs to be validated.
 * 
 * @returns {{hasError: boolean, errorText: string}}
 * Map containing `hasError` and `errorText`. If the field
 * is valid or `fieldType` is invalid, `errorText` will be `null`.
 */
export const validateFormField = (textValue, fieldType) => {
    let formFieldError = {
        hasError: false,
        errorText: null
    }

    switch (fieldType) {
        case 'name':
            if (textValue.trim() === '') {
                formFieldError = {
                    hasError: true,
                    errorText: "Name cannot be empty"
                }
            }

            break;

        case 'email':
            if (textValue === '') {
                formFieldError = {
                    hasError: true,
                    errorText: "Email cannot be empty"
                }
            }

            else if (!emailValidationRegex.test(textValue)) {
                formFieldError = {
                    hasError: true,
                    errorText: "Email is invalid"
                }
            }

            break;

        case 'phone':
            if (textValue === '') {
                formFieldError = {
                    hasError: true,
                    errorText: "Phone number cannot be empty"
                }
            }

            else if (!phoneNumberValidationRegex.test(textValue)) {
                formFieldError = {
                    hasError: true,
                    errorText: "Phone number is invalid"
                }
            }

            break;

        case 'role':
            if (textValue === '') {
                formFieldError = {
                    hasError: true,
                    errorText: "Role cannot be left unselected"
                }
            }

            else if (getRoleLabel(textValue) === null) {
                formFieldError = {
                    hasError: true,
                    errorText: "Role is invalid"
                }
            }

            break;

        case 'password':
            if (textValue === '') {
                formFieldError = {
                    hasError: true,
                    errorText: 'Password cannot be empty'
                }
            }

            else if (textValue.length < 8) {
                formFieldError = {
                    hasError: true,
                    errorText: 'Password must be atleast 8 characters long!'
                }
            }

            break;
    }

    return formFieldError;
}
