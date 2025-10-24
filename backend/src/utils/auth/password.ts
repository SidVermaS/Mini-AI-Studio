import crypto from 'crypto';

const SALT_ROUNDS: number = 12;
const KEY_LENGTH: number = 64;

export const generateSalt = (): string => crypto.randomBytes(16).toString('hex');

export const hashPassword = (password: string, saltRounds: number = SALT_ROUNDS): Promise<string> =>
  new Promise((resolve, reject) => {
    const salt: string = generateSalt();
    crypto.pbkdf2(password, salt, saltRounds, KEY_LENGTH, 'sha512', (err, derivedKey) => {
      if (err) {
        return reject(err);
      }
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });

export const comparePassword = (
  passwordHashed: string,
  password: string,
  saltRounds: number = SALT_ROUNDS,
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const parts: string[] = passwordHashed.split(':');
    if (parts.length !== 2) {
      return reject(new Error('Invalid hash format'));
    }
    const [salt, storedHash] = parts;
    crypto.pbkdf2(password, salt, saltRounds, KEY_LENGTH, 'sha512', (err, derivedKey) => {
      if (err) {
        return reject(err);
      }
      resolve(storedHash === derivedKey.toString('hex'));
    });
  });
