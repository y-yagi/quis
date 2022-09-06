import { createContext } from "react";
import { User } from "@supabase/supabase-js";

const UserContext = createContext<User | null>(null);

export default UserContext