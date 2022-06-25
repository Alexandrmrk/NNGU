import { Decorate } from '../../common';
import { ISignupParams } from '../../models/database/repository/Auth/interfaces';


export type AuthRequest = Decorate;

export type SignupRequest = Decorate<{ payload: ISignupParams }>;
