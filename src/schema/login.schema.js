import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: yup.string().max(255).required('Password is required')
});

export default loginSchema;
