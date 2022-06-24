import * as yup from 'yup';

export const ValidationUser = yup.object({
    name: yup
    .string('Digite seu nome.')
    .min(2, 'Digite no mínimo 2 caracteres.')
    .max(70, 'Digite no máximo 70 caracteres.')
    .required('Este campo é obrigatório.'),
    username: yup
    .string('Crie um Username.')
    .min(2, 'Digite no mínimo 2 caracteres.')
    .max(20, 'Digite no máximo 20 caracteres.')
    .required('Este campo é obrigatório.'),
    password: yup
    .string('Crie sua senha.')
    .min(2, 'Digite no mínimo 2 caracteres.')
    .max(20, 'Digite no máximo 20 caracteres.')
    .required('Este campo é obrigatório.'),
});