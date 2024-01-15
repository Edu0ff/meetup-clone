import { generateError } from "../../../domain/utils/helpers.js";
import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError(
        "No authorized. You must be a registered user to perform this action.",
        401
      );
    }

    const token = jwt.verify(
      authorization.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );


    req.userId = token.userId;
    req.userEmail = token.userEmail;
    req.Name = token.Name;
    req.lastName = token.lastName;
    req.userUsername = token.userUsername;

    next();
  } catch (error) {
    console.error(error); 
    next(error);
  }
};
