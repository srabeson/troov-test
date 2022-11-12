import bcrypt from "bcrypt";

const saltRounds = 10;

/**
 * Hash a plaintext password
 *
 * @param plaintextPassword Plaintext password
 * @returns Hashed password
 */
export const hashPassword = async (plaintextPassword: string) => {
  return await bcrypt.hash(plaintextPassword, saltRounds);
};

/**
 * Checks if a plaintext password and a hashed password are the same
 *
 * @param plaintextPassword Plaintext password
 * @param passwordHash Password Hash
 * @returns Whether the provided passwords are the same or not
 */
export const comparePasswords = async (
  plaintextPassword: string,
  passwordHash: string
) => {
  return await bcrypt.compare(plaintextPassword, passwordHash);
};
