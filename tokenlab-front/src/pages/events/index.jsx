import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import { GrLogout } from 'react-icons/gr';
import { GrAddCircle } from 'react-icons/gr';
import { IoReload } from 'react-icons/io5';

import "./index.css";
import ModalAddEvent from '../../components/modals/addModal';
import { CardEvent } from './cardEvent';

export const Events = () => {
    const [username, setUsername] = useState("");//username do usuário
    const [events, setEvents] = useState([]); //eventos
    const [openAddModal, setOpenAddModal] = useState(false); //abrir e fechar modal
    const [reload, setRealod] = useState(); //atualizando eventos

    const URL = "http://localhost:8080/";
    const navigate = useNavigate();

    useEffect(() => {
        //checando se o usuário fez login
        if(!localStorage.getItem("login")){
            navigate("/login");
        } else{
            setUsername(localStorage.getItem("login"));
            //pegando eventos do usuário;
            axios.get(`${URL}events/${localStorage.getItem("login")}`)
            .then(res => setEvents(res.data));
        }
    }, [navigate]);

    //atualizando valores após ações de modal
    useEffect(() => {
        //pegando eventos do usuário;
        axios.get(`${URL}events/${localStorage.getItem("login")}`)
        .then(res => setEvents(res.data));
    }, [events, reload]);

    const logout = () => {
        localStorage.removeItem("login")
        navigate("/login");
    };
    
    return(
        <section>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Eventos de <span className='username'>{username.toUpperCase()}</span>
                        </Typography>
                        <Typography>
                            <Button>
                                <GrLogout size={"40px"} onClick={() => logout()}/>
                            </Button>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
           
            <article className='container-events'>
                <Button size='large' sx={{ my:'10px', p:'10px 30px' }} variant="contained" onClick={() => setOpenAddModal(true)}>
                    Criar evento <GrAddCircle size={"25px"} />
                </Button>
                <ModalAddEvent open={openAddModal} setOpen={setOpenAddModal} />
                
                <Button size='large' sx={{ m:'10px', p:'10px 30px' }} variant="contained" onClick={() => setRealod(!reload)}>
                    <IoReload size={"25px"} />
                </Button>
                
                <div className='container-event-cards'>
                    { events?.map( event => {
                        return(
                            <CardEvent
                                key={event.idevent}
                                idevent={event.idevent}
                                description={event.description}
                                start={event.start}
                                finish={event.finish}
                            />
                        )
                    })
                    }
                </div>
            </article>
        </section>
    )
}