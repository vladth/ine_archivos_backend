declare namespace Express {
  export interface Request {
    userId?: string;
    userName?: string;
    userRol?: string;
    file?: any;
  }
}
