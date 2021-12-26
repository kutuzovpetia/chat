import * as yup from "yup";

export const validationSchema = yup.object().shape({
    firstName: yup.string().typeError('The firstname must be a string').required('First name field is required').min(3, 'Must be exactly 3 letters').max(25, 'Must be exactly 25 letters'),
    secondName: yup.string().typeError('The secondName must be a string').required('Second name field is required').min(3, 'Must be exactly 3 letters').max(25, 'Must be exactly 25 letters'),
    details: yup.string().typeError('The details must be a string').required('Details field is required').min(3, 'Must be exactly 3 letters').max(200, 'Must be exactly 25 letters'),
    password: yup.string().typeError('The password must be').required('Password field is required').min(5, 'Must be exactly 5 digits').max(8, 'Must be exactly 8 digits'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords are different').required('Confirm password field is required').min(5, 'Must be exactly 5 digits').max(8, 'Must be exactly 8 digits'),
    phoneOrEmail: yup.string("Enter your Email/Phone Number").required("Email/Phone Number is required")
        .test('test-name', 'Enter Valid Phone/Email',
            function(value) {
                const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
                let isValidEmail = emailRegex.test(value);
                let isValidPhone = phoneRegex.test(value);
                if (!isValidEmail && !isValidPhone ){
                    return false;
                }
                return true;
            })
})

export const loginValidationSchema = yup.object().shape({
    password: yup.string().typeError('The password must be').required('Password field is required').min(5, 'Must be exactly 5 digits').max(8, 'Must be exactly 8 digits'),
    phoneOrEmail: yup.string("Enter your Email/Phone Number").required("Email/Phone Number is required")
        .test('test-name', 'Enter Valid Phone/Email',
            function(value) {
                const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
                let isValidEmail = emailRegex.test(value);
                let isValidPhone = phoneRegex.test(value);
                if (!isValidEmail && !isValidPhone ){
                    return false;
                }
                return true;
            })
})

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/