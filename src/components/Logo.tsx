import { Link } from "react-router-dom";
import logo from "/job-wise2.png";
export default function Logo() {
  return (
    <Link to={"/"} className="flex justify-start items-center">
      <img src={logo} className={`w-[3em] md:w-[3em] h-auto`} alt="" />
      <span className="font-medium text-sm md:text-sm tracking-widest font-montserrat">
        JobWise
      </span>
    </Link>
  );
}
