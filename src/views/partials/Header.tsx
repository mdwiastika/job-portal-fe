import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Switch,
} from "@nextui-org/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../../components/Logo";
import icon from "/job-wise2.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "./Footer";
import HugeiconsDisability from "../../components/DisabilityLogo";
import NormalPeople from "../../components/NormalLogo";
import axiosInstance from "src/axiosInstance";
const menuItems = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Search Job",
    url: "/jobs",
  },
  {
    name: "Companies",
    url: "/companies",
  },
  {
    name: "Profile",
    url: "/my-profile",
  },
];
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nameMenu, setNameMenu] = useState("Home");
  const location = useLocation();
  const [isDisability, setIsDisability] = useState(
    localStorage.getItem("isDisability") === "true" ? true : false
  );
  useEffect(() => {
    if (isDisability) {
      localStorage.setItem("isDisability", "true");
    } else {
      localStorage.setItem("isDisability", "false");
    }
  }, [isDisability]);
  useEffect(() => {
    const item = menuItems.find((item) => item.url === location.pathname);
    if (item) {
      setNameMenu(item.name);
    }
    if (localStorage.getItem("access_token")) {
      setIsAuthenticated(true);
    }
  }, [location.pathname]);
  const logoutHandler = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
      }
  };
  return (
    <main className="font-montserrat">
      <HelmetProvider>
        <Helmet>
          <title>JobWise | {nameMenu}</title>
          <link rel="shortcut icon" href={icon} type="image/x-icon" />
        </Helmet>
      </HelmetProvider>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="bg-gray-100/40 backdrop-blur-md"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem
              key={`${index}-nav`}
              className="hover:text-blue-500 transition hover:underline underline-offset-4 ease-out tracking-wide text-sm font-medium font-montserrat"
            >
              <Link
                color="foreground"
                to={item.url}
                className={`${
                  location.pathname == item.url ? "text-blue-700" : ""
                }`}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
          <NavbarItem className="">
            <Switch
              defaultSelected={
                localStorage.getItem("isDisability") === "true" ? true : false
              }
              size="md"
              onValueChange={() => {
                setIsDisability(isDisability ? false : true);
              }}
              color="primary"
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <HugeiconsDisability className={className} />
                ) : (
                  <NormalPeople className={className} />
                )
              }
            ></Switch>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {!isAuthenticated ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link to="/login" className="text-sm text-blue-700 font-medium">
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  to="/signup"
                  className="text-sm font-medium bg-blue-700 text-white py-2 px-4 rounded-full"
                >
                  Sign Up
                </Link>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem className="hidden lg:flex">
              <button
                onClick={logoutHandler}
                className="text-sm bg-blue-700 text-white py-2 px-4 rounded-full font-medium"
              >
                Logout
              </button>
            </NavbarItem>
          )}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                to={item.url}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <Outlet />
      <Footer />
    </main>
  );
}
