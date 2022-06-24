import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

import "./index.css"
import Logo from '../../images/logo.png';
import { ValidationUser } from '../../components/formValidation/users';

export const Login = () => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState()

    const URL = "http://localhost:8080/";
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${URL}users`)
        .then((res) => {
            setUsers(res.data)
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: ValidationUser,
    });

    function login(e) {
        e.preventDefault()
        if (users.some(user => user.username === formik.values.username && user.password === formik.values.password)){
            alert("Login feito com sucesso")
            navigate("/eventos")
            localStorage.setItem("login", formik.values.username)
            setError(false)
        } else setError(true)
    }

    return(
        <section className="bg-padrao">
            <article className="container-form">

                <img src={Logo} alt="logo-tokenlab"/>

                <div className="form">
                    <h1>Faça Login</h1>

                    <form onFocus={() => formik.handleSubmit()} onSubmit={(e) => login(e)}>
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            sx={{ my:'8px' }}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Senha"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ my:'8px' }}
                        />
                       {error === true && 
                            (<div className='error-login'>Username ou Senha incorretos</div>)
                        }

                        <Button size='large' sx={{ mt:'30px', mb:"10px" }} variant="contained" type="submit">Login</Button>
                    </form>
                    <div className='link-login'>
                        Ainda não possui uma conta? <Link to={"/cadastro"}><span>Faça o cadastro</span></Link>
                    </div>
                </div>
            </article>
        </section>
    )
}