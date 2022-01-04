import s from './auth.module.sass';
import { Formik } from 'formik';
import {useRef, useState} from "react";
import Avatar from "../../components/avatar";
import {validationSchema} from "../../validation/validationSchema";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Registration = () => {

    const navigate = useNavigate();
    const inputFile = useRef(null);
    const [avatar, setAvatar] = useState('https://avochka.ru/img/kartinka/1/enot_glass.jpg');
    const [imageFile, setImageFile] = useState(null);
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
        setImageFile(e.target.files[0])
    };

    const onSubmit = async (values) => {

        const bodyFormData = new FormData();

        for (let key in values) bodyFormData.append(key, values[key]);
        bodyFormData.append("photo", imageFile)

        await axios.post('/auth/registration', bodyFormData, )
        .then(res => {
            if(res.status === 200) {
                navigate('/');
            }
        })
    }

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
                        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty})=>(

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
                                    }}
                                    ref={inputFile}
                                    name='avatar'
                                    accept='image/*'
                                    type='file'
                                    hidden
                                />

                                <div className={s.avatar}>
                                    <Avatar url={avatar} large showOnline={false}/>
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

export default Registration;
