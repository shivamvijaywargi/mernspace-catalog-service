import { Request } from "express";

export type AuthCookie = {
  accessToken: string;
};
export interface IAuthRequest extends Request {
  auth: {
    sub: string;
    role: string;
    id?: string;
  };
}
