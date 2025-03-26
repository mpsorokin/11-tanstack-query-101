export function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  };

  return (
    <div className="p-5 border border-slate-500 rounded-lg container mx-auto mt-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-bold text-xl">Login</h1>
        <input
          className="p-5 rounded border border-slate-500"
          type="text"
          name="login"
          placeholder="Login"
        />
        <input
          className="p-5 rounded border border-slate-500"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="p-5 rounded bg-teal-500 text-white" type="submit">
          Вход
        </button>
      </form>
    </div>
  );
}
