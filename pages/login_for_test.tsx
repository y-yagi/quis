import { ChangeEvent, FormEvent, useState } from "react";
import Container from "../components/Container";
import { supabase } from "../lib/supabaseClient";

export default function LoginForTest() {
  const [message, setMessage] = useState<string>("This is a test page");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error;
    setMessage("login success");
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <p className="message">{message}</p>
      <form onSubmit={handleSubmit} className="w-full divide-y">
        <label className="block">
          <input
            type="text"
            required
            name="email"
            onChange={handleChangeEmail}
            id="email"
            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-textarea"
          />
        </label>
        <label className="block">
          <div className="pr-8">
            <input
              type="text"
              required
              name="password"
              id="password"
              onChange={handleChangePassword}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-textarea"
            />
          </div>
        </label>
        <div className="block">
          <div className="md:w-1/6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
}
