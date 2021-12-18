import s from './auth.module.sass';
import * as yup from 'yup';
import { Formik } from 'formik';
import {useRef, useState} from "react";
import Avatar from "../../components/avatar";
import {useHttp} from "../../hooks/http.hook";

const Auth = () => {

    const {request} = useHttp();
    const inputFile = useRef(null);
    const [avatar, setAvatar] = useState('https://avochka.ru/img/kartinka/1/enot_glass.jpg');
    const values = {
        firstName: '',
        secondName: '',
        details: '',
        password: '',
        confirmPassword: '',
        phoneOrEmail: ''
    }

    const onButtonClick = () => inputFile.current.click()

    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setAvatar(reader.result);
        reader.onerror = error => console.log('Error: ', error);
    };

    const onSubmit = async (values) => {
        console.log(values);
        const result = await request('/registration', 'POST', {'Content-Type': 'application/json'}, JSON.stringify(values))
    }

    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = yup.object().shape({
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

    return(
        <div>
            <header className={s.header}>
                <h1>Join Chat</h1>
            </header>

            <section>
                <Formik initialValues={values}
                        validateOnBlur
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                >
                    {
                        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldValue})=>(

                            <>
                                <label htmlFor={"firstName"}>
                                    First name
                                </label>
                                <input type={`text`}
                                       name={`firstName`}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.firstName}
                                />
                                {touched.firstName && errors.firstName && <div className={s.error}>{errors.firstName}</div>}

                                <label htmlFor={"secondName"}>
                                    Second name
                                </label>
                                <input type={`text`}
                                       name={`secondName`}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.secondName}
                                />
                                {touched.secondName && errors.secondName && <div className={s.error}>{errors.secondName}</div>}

                                <label htmlFor={"phoneOrEmail"}>
                                    Phone or email
                                </label>
                                <input type={`text`}
                                       name={`phoneOrEmail`}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.phoneOrEmail}
                                />
                                {touched.phoneOrEmail && errors.phoneOrEmail && <div className={s.error}>{errors.phoneOrEmail}</div>}

                                <label htmlFor={"password"}>
                                    Password
                                </label>
                                <input type={`password`}
                                       name={`password`}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.password}
                                />
                                {touched.password && errors.password && <div className={s.error}>{errors.password}</div>}

                                <label htmlFor={"confirmPassword"}>
                                    Confirm password
                                </label>
                                <input type={`password`}
                                       name={`confirmPassword`}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.confirmPassword}
                                />
                                {touched.confirmPassword && errors.confirmPassword && <div className={s.error}>{errors.confirmPassword}</div>}

                                <label htmlFor={"details"}>
                                    Any details such as age, occupation or city.
                                    Example: 23 y.o. designer from San Francisco
                                </label>
                                <textarea
                                    type={`text`}
                                    name={`details`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.details}
                                />
                                {touched.details && errors.details && <div className={s.error}>{errors.details}</div>}

                                <label htmlFor={"avatar"}>
                                    Select photo
                                </label>

                                <input
                                    onChange={(e)=>{
                                        handleFileUpload(e)
                                        setFieldValue("file", e.currentTarget.files[0]);
                                    }}
                                    ref={inputFile}
                                    name='avatar'
                                    accept='image/*'
                                    type='file'
                                    hidden
                                />

                                <div className={s.avatar}>
                                    <Avatar url={avatar} large/>
                                    <button className={s.btn} onClick={onButtonClick}>
                                        Upload File
                                    </button>
                                </div>

                                <button
                                    className={s.btn}
                                    disabled={!isValid && !dirty}
                                    onClick={handleSubmit}
                                    type={`submit`}
                                >
                                    Send
                                </button>
                            </>
                        )
                    }
                </Formik>
            </section>
        </div>
    )
}

export default Auth;
