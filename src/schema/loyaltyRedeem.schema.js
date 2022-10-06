import * as yup from 'yup';

const loyaltyRedeemSchema = yup.object().shape({
    name: yup.string().max(50, 'Pack name should be maximum 100 characters only').required('Please enter pack name'),
    points: yup.number().required('Please enter loyalty points'),
    amount: yup.number().required('Please enter amount')
});

export default loyaltyRedeemSchema;
