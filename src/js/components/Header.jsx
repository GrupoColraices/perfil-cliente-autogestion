export const Header = ({ title = "Perfil del cliente" }) => {
  return (
    <header className="mb-10">
      <div className="w-full ">
        <img
          className="mx-auto w-80 rounded-b-2xl p-4 shadow-[14px_16px_16px_-9px_#0000001a,inset_15px_-15px_18px_-10px_#0000001a]"
          src="/assets/colraices_logo.svg"
          alt="Logo Colraices"
        />
      </div>

      <h1 className="title mb-10">{title}</h1>
    </header>
  );
};
