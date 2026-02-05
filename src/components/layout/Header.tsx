import Link from "next/link";
import LogoSVG from "@/assets/dokai.svg";

const Header = () => {
  return (
    <header>
      <LogoSVG />
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/works">Works</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
