import { useState } from 'react';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import "./index.css";
import ModalEditEvent from '../../../components/modals/editModal';

export const CardEvent = (props) => {
    const [openEditModal, setOpenEditModal] = useState(false);

    const URL = "http://localhost:8080/";

    const removeEvent = (id) => {
        axios.delete(`${URL}delete-event/${id}`)
        window.location.reload()
    };

    return(
        <>
            <ModalEditEvent
                open={openEditModal}
                setOpen={setOpenEditModal}
                idevent={props.idevent}
                description={props.description}
                start={props.start}
                finish={props.finish}
            />
            <div className='card-event'>
                <div className='category'>
                    <p><span className='tittle-category'>Descrição:</span> {props.description}</p>
                </div>
                <div className='category'>
                    <p><span className='tittle-category'>Início:</span> {props.start}</p>
                </div>
                <div className='category'>
                    <p><span className='tittle-category'>Final:</span> {props.finish}</p>
                </div>
                <div className='category-action'>
                    <span className='icon-action' onClick={() => setOpenEditModal(true)}>
                        <AiFillEdit size={"35px"}/>
                    </span>
                    <span className='icon-action' onClick={() => removeEvent(props.idevent)}>
                        <MdDelete size={"35px"}/>
                    </span>
                </div>
            </div>
        </>
    )
}