import { AboutPage } from "./components/about-page";
import { ContactPage } from "./components/contact-page";
import { HomePage } from "./components/home-page";
import { NavigationBar } from "./components/navigation-bar";

const router = {
  "/": "home-page",
  "/about": "about-page",
  "/contact": "contact-page",
};

const main = document.querySelector("main");
const navigateTo = (url) => {
  history.pushState(null, null, url);
  handleNavigation();
};

const handleNavigation = () => {
  const path = location.pathname;
  const pageComponentName = router[path];
  if (!pageComponentName) {
    return;
  }
  const navigation = document.createElement("navigation-bar");
  const pageComponent = document.createElement(pageComponentName);
  main.innerHTML = "";
  main.append(navigation, pageComponent);

  const navigationBar = document.querySelector("navigation-bar");
  navigationBar.addEventListener("navigate", (event) => {
    navigateTo(event.detail.url);
  });
};

window.addEventListener("popstate", handleNavigation);

handleNavigation();
