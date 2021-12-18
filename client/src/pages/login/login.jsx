import s from './login.module.sass';
import {Formik} from "formik";
import {Link} from 'react-router-dom';
import classNames from "classnames";
import {validationSchema} from "../../validation/validationSchema";
import {useHttp} from "../../hooks/http.hook";


const Login = () =>{

    const {request} = useHttp();

    const values = {
        phoneOrEmail: '',
        password: ''
    }

    const onSubmit = async (values) => {
        console.log(values);
        const result = await request('/login', 'POST', {'Content-Type': 'application/json'}, JSON.stringify(values))
    }

    return(
        <>
            <header className={s.header}>
                <h1>Join Chat</h1>
            </header>

            <Formik initialValues={values}
                    validateOnBlur
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
            >
                {
                    ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty})=>(
                        <section>
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

                            <button
                                className={s.btn}
                                disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type={`submit`}
                            >
                                Log In
                            </button>

                            <div className={s.line}>
                                <span>or</span>
                            </div>

                            <Link to={'/auth'} className={classNames(s.btn, s.link)}>
                                    Create new account
                            </Link>
                        </section>
                    )
                }
            </Formik>
        </>
    )
}

export default Login;