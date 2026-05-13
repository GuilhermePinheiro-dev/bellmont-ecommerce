const menus = [
  { title: "Masculino", items: ["Casual", "Esporte", "Premmium"] },
  { title: "Feminino", items: ["Casual", "Esporte", "Premmium"] },
  { title: "Outlet", items: ["Masculino", "Feminino"] },
  { title: "Sobre", items: ["Quem somos", "Missão"] },
];

export const MenuItems = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-8">
      {menus.map(({ title, items }) => (
        <nav key={title} className="text-white">
          <ul className="flex flex-col gap-4 ">
            <li>
              <p className="font-bold text-xl text-background-tertiary">{title}</p>
            </li>
            {items.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="font-medium text-lg hover:text-primary-light transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
};
