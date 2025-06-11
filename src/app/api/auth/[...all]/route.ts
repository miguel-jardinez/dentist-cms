import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@dentist/utils/auth";
 
export const { POST, GET } = toNextJsHandler(auth);
