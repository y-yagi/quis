import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Hi</h1>
        <p className="description">This is Dhashboard</p>
      </div>
    </div>
  );
}
