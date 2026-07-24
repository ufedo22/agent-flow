import { getServerSession } from "next-auth";
import { authOptions } from "@//app/api/auth/[...nextauth]/route";


//helper function to get the current session
export const getSession = () => getServerSession(authOptions)