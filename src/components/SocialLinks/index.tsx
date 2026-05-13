import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoTiktok } from "react-icons/bi";
import { BiLogoWhatsapp } from "react-icons/bi";

const socialLinks = [
  { href: "#", icon: <BiLogoInstagram />, name: "Instagram" },
  { href: "#", icon: <BiLogoFacebook />, name: "Facebook" },
  { href: "#", icon: <BiLogoTiktok />, name: "Tiktok" },
  { href: "#", icon: <BiLogoWhatsapp />, name: "Whastapp" },
];

export const SocialLinks = () => {
  return (
    <div className="text-white">
      <p className="mb-4 text-xl font-medium">Redes Sociais</p>

      <ul className="flex gap-5 text-2xl">
        {socialLinks.map(({ href, icon, name }) => (
          <li key={name} aria-label={name}>
            <a href={href}>{icon}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
