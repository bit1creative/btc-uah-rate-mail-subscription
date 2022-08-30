import { z } from 'zod';

const emailSchema = z.string().email();

export const validateEmail = (email: string) => {
    const validation = emailSchema.safeParse(email);
    if (!validation.success) return;
    return validation.data;
};
