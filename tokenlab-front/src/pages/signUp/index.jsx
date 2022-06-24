import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Button, TextField } from '@mui/material';

import "./index.css";
import { ValidationUser } from '../../components/formValidation/users';
import Logo from '../../images/logo.png';

export const SignUp = () => {

    const URL = "http://localhost:8080/";
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
        },
        validationSchema: ValidationUser,
    });

    function addUser(e) {
        e.preventDefault()
        if (!formik.errors.name && !formik.errors.username && !formik.errors.password){
            alert(`Conta ${formik.values.username} criada com sucesso`)
            axios.post(`${URL}register`, {
                  name: formik.values.name,
                  username: formik.values.username,
                  password: formik.values.password,
                },
            );
            navigate("/login")
        } else return
    };

    return(
        <section className="bg-padrao">
            <article className="container-form">

                <img src={Logo} alt="logo-tokenlab"/>

                <div className="form">
                    <h1>Cadastre-se</h1>

                    <form onFocus={() => formik.handleSubmit()} onSubmit={(e) => addUser(e)}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Nome"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={{ my:'5px' }}
                        />
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            sx={{ my:'5px' }}
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
                            sx={{ my:'5px' }}
                        />
                        <PasswordStrengthBar password={formik.values.password}/>

                        <Button size='large' sx={{ mt:'15px' }} variant="contained" type="submit">Cadastrar</Button>
                    </form>
                    <div className='link-login'>
                        Já possui uma conta? <Link to={"/login"}><span>Faça Login</span></Link>
                    </div>
                </div>
            </article>
        </section>
    );
};