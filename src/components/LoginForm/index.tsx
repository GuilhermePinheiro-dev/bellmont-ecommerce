export const LoginForm = () => {
  return (
    <form className="flex flex-col gap-3.5 ">
      <input
        type="email"
        placeholder="email"
        className="border rounded-md w-full text-black border-gray-200 p-3 focus:outline-none"
      />
      <button className="bg-primary-dark text-white uppercase font-semibold rounded-md py-3 transition-all hover:bg-primary-light disabled:opacity-50 w-full cursor-pointer">
        Continuar
      </button>
    </form>
  );
};
