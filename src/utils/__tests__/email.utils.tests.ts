import { validateEmail } from '../email.utils';

const validEmail = 'email@gmail.com';
const invalidEmail = 'asdasdsa';

describe('Email utils', () => {
    it('valid email passes the check', () => {
        const response = validateEmail(validEmail);

        expect(response).toStrictEqual(validEmail);
    });

    it('invalid email doesnt passe the check', () => {
        const response = validateEmail(invalidEmail);

        expect(response).toStrictEqual(undefined);
    });
});
