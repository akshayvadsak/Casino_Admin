import * as yup from 'yup';

const ConstantsSchema = yup.object().shape({
    name: yup.string().max(255, 'Question should be maximum 255 characters').required('Please enter constant name'),
    value: yup.string().max(255, 'Answer should be maximum 255 characters').required('Please enter constant value')
});

export default ConstantsSchema;
