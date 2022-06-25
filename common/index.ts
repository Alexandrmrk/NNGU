import * as Hapi from '@hapi/hapi';
import bcrypt from 'bcrypt';

export type Decorate<T = {}> = Readonly<T> & Hapi.Request;

export enum authStrategy {
  STATIC = 'static',
}

export enum roles {
  USER = 'user',
  ADMIN = 'admin',
}

export const hashPassword = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const checkPassword = async (password: string, passwordHash: string) => {
  try {
    const checkPasswordStatus = await bcrypt.compare(password, passwordHash);
    return checkPasswordStatus;
  } catch (e) {
    throw new Error(e.message);
  }
};
