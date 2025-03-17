import jwt from "jsonwebtoken";
const SECRET_KEY = "some";

type Payload = {
  userId: string;
  username: string;
  cedula: string;
};

export const generateToken = ({ userId, username, cedula }: Payload) => {
  return jwt.sign({ userId, username, cedula }, SECRET_KEY, {
    expiresIn: "8h",
  });
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY) as Payload;
    return payload;
  } catch (error) {
    return null;
  }
};
