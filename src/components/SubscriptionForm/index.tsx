export const SubscriptionForm = () => {
  return (
    <form className="flex flex-col text-white">
      <label htmlFor="newsletter">Inscreva-se no nosso email</label>
      <input
        type="text"
        id="newsletter"
        name="newsletter"
        placeholder="email@email.com"
        className="rounded-[30px] bg-white py-3 px-5 placeholder-[#aaaaaa] text-black"
      />
    </form>
  );
};
