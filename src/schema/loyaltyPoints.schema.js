import * as yup from 'yup';

const loyaltyPointsSchema = yup.object().shape({
    level: yup.string().required('Please enter loyalty level'),
    pointsStart: yup.number().required('Please enter start value for loyalty point range'),
    pointsEnd: yup.number().required('Please enter end value for loyalty point range').moreThan(yup.ref('pointsStart')),
    multiplier: yup.number('Multiplier should be a number').required('Please enter multiplier for loyalty level')
});

export default loyaltyPointsSchema;
