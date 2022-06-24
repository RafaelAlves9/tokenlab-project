import * as yup from 'yup';

export const ValidationEvent = yup.object({
    description: yup
    .string('Digite uma descripção.')
    .min(2, 'Digite no mínimo 2 caracteres.')
    .max(70, 'Digite no máximo 70 caracteres.')
    .required('Este campo é obrigatório.'),
    start: yup
    .date()
    .required('Este campo é obrigatório.'),
    finish: yup
    .date()
    .required('Este campo é obrigatório.'),
});