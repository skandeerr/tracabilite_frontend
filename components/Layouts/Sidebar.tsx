import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toggleSidebar } from "../../store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "../../store";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";


const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };
  // useEffect(() => {
  //   function CheckToken() {
  //     if (localStorage.getItem("accessToken") == null) {
  //       router.push("/users/login");
  //     }
  //   }
  //   CheckToken();
  // }, []);

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    selector?.classList.add("active");
  };

  const dispatch = useDispatch();

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link
              href="/dashboard"
              className="main-logo flex shrink-0 items-center"
            >
              <img
                className="inline w-16 ltr:-ml-2 rtl:-mr-2"
                src="http://192.168.66.212:31619/assets/images/company_logo.svg"
                alt="logo"
              />
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="m-auto h-5 w-5"
              >
                <path
                  d="M13 19L7 12L13 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.5"
                  d="M16.9998 19L10.9998 12L16.9998 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <li className="menu nav-item">
                <Link
                  type="button"
                  href={"/dashboard"}
                  className={`${
                    currentMenu === "dashboard" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("dashboard")}
                >
                  <div className="flex items-center">
                    <svg
                      className="group-hover:!text-primary shrink-0"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                        fill="currentColor"
                      />
                      <path
                        d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                      {"dashboard"}
                    </span>
                  </div>

                  {/* <div
                    className={
                      currentMenu === "dashboard"
                        ? "rotate-90"
                        : "rtl:rotate-180"
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div> */}
                </Link>

                {/* <AnimateHeight
                  duration={300}
                  height={currentMenu === "dashboard" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <Link href="/">{"sales"}</Link>
                    </li>
                    <li>
                      <Link href="/analytics">{"analytics"}</Link>
                    </li>
                    <li>
                      <Link href="/finance">{"finance"}</Link>
                    </li>
                    <li>
                      <Link href="/crypto">{"crypto"}</Link>
                    </li>
                  </ul>
                </AnimateHeight> */}
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <svg
                  className="hidden h-5 w-4 flex-none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>{"Actualités"}</span>
              </h2>

              <li className="nav-item">
                <ul>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${
                        currentMenu === "invoice" ? "active" : ""
                      } nav-link group w-full`}
                      onClick={() => toggleMenu("invoice")}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.6111 1.5837C17.2678 1.34703 18.75 2.63255 18.75 4.30606V5.68256C19.9395 6.31131 20.75 7.56102 20.75 9.00004V19C20.75 21.0711 19.0711 22.75 17 22.75H7C4.92893 22.75 3.25 21.0711 3.25 19V5.00004C3.25 4.99074 3.25017 4.98148 3.2505 4.97227C3.25017 4.95788 3.25 4.94344 3.25 4.92897C3.25 4.02272 3.91638 3.25437 4.81353 3.12621L15.6111 1.5837ZM4.75 6.75004V19C4.75 20.2427 5.75736 21.25 7 21.25H17C18.2426 21.25 19.25 20.2427 19.25 19V9.00004C19.25 7.7574 18.2426 6.75004 17 6.75004H4.75ZM5.07107 5.25004H17.25V4.30606C17.25 3.54537 16.5763 2.96104 15.8232 3.06862L5.02566 4.61113C4.86749 4.63373 4.75 4.76919 4.75 4.92897C4.75 5.10629 4.89375 5.25004 5.07107 5.25004ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4143 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4143 7.25 12ZM7.25 15.5C7.25 15.0858 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 15.0858 14.25 15.5C14.25 15.9143 13.9142 16.25 13.5 16.25H8C7.58579 16.25 7.25 15.9143 7.25 15.5Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {"Actualités"}
                        </span>
                      </div>

                      <div
                        className={
                          currentMenu === "invoice"
                            ? "!rotate-90"
                            : "rtl:rotate-180"
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5L15 12L9 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "invoice" ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/actualites/feed">
                            {"Articles"}
                          </Link>
                        </li>
                          <div>
                            <span>Gérer ARTICLES</span>
                            <li>
                              <Link href="/dashboard/actualites/feed-list">
                                {"Liste des articles"}
                              </Link>
                            </li>
                            <li>
                              <Link href="/dashboard/actualites/categories-list">
                                {"Liste des catégories"}
                              </Link>
                            </li>
                          </div>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <svg
                  className="hidden h-5 w-4 flex-none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>{"Gestion des effectifs"}</span>
              </h2>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "component" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("component")}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle
                        opacity="0.5"
                        cx="15"
                        cy="6"
                        r="3"
                        fill="currentColor"
                      />
                      <ellipse
                        opacity="0.5"
                        cx="16"
                        cy="17"
                        rx="5"
                        ry="3"
                        fill="currentColor"
                      />
                      <circle cx="9.00098" cy="6" r="4" fill="currentColor" />
                      <ellipse
                        cx="9.00098"
                        cy="17.001"
                        rx="7"
                        ry="4"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                      {"Gestion des effectifs"}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu === "component"
                        ? "rotate-90"
                        : "rtl:rotate-180"
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "component" ? "auto" : 0}
                >
                    <ul className="sub-menu text-gray-500">
                      <li>
                        <Link href="/dashboard/effectifs/dashboard">
                          {"Tableau de bord"}
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/effectifs/collaborators">
                          {"Collaborateurs"}
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/effectifs/sponsorships">
                          {"Parrainages"}
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/effectifs/birthdays">
                          {"Anniversaires"}
                        </Link>
                      </li>
                      <span> AUTRE </span>
                      <li>
                        <Link href="/dashboard/effectifs/contractTypes">
                          {"Type de Contrats"}
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/effectifs/banks">
                          {"Banques"}
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/effectifs/taskTypes">
                          {"Type de tâches"}
                        </Link>
                      </li>
                    </ul>
                
                    <ul className="sub-menu text-gray-500">
                      <span> MES PAGES </span>
                      <li>
                        <Link href="/dashboard/effectifs/myProfile">
                          {"Mon Profil"}
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/effectifs/mysponsorship">
                          {"Mes Parrainages"}
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/effectifs/contacts">
                          {"Listes des contacts"}
                        </Link>
                      </li>
                    </ul>
                  
                </AnimateHeight>
              </li>
              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <svg
                  className="hidden h-5 w-4 flex-none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>{"Congés & Autorisations"}</span>
              </h2>
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "element" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("element")}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="currentColor"
                    >
                      <path
                        d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11C11.5523 11 12 11.4477 12 12Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 16C12 16.5523 11.5523 17 11 17C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15C11.5523 15 12 15.4477 12 16Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 13C6.55229 13 7 12.5523 7 12C7 11.4477 6.55229 11 6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 17C6.55229 17 7 16.5523 7 16C7 15.4477 6.55229 15 6 15C5.44772 15 5 15.4477 5 16C5 16.5523 5.44772 17 6 17Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 0.75C6.41421 0.75 6.75 1.08579 6.75 1.5V2.26272C7.412 2.24999 8.14133 2.24999 8.94346 2.25H13.0564C13.8586 2.24999 14.588 2.24999 15.25 2.26272V1.5C15.25 1.08579 15.5858 0.75 16 0.75C16.4142 0.75 16.75 1.08579 16.75 1.5V2.32709C17.0099 2.34691 17.2561 2.37182 17.489 2.40313C18.6614 2.56076 19.6104 2.89288 20.3588 3.64124C21.1071 4.38961 21.4392 5.33855 21.5969 6.51098C21.75 7.65018 21.75 9.1058 21.75 10.9435V13.0564C21.75 14.8941 21.75 16.3498 21.5969 17.489C21.4392 18.6614 21.1071 19.6104 20.3588 20.3588C19.6104 21.1071 18.6614 21.4392 17.489 21.5969C16.3498 21.75 14.8942 21.75 13.0565 21.75H8.94359C7.10585 21.75 5.65018 21.75 4.51098 21.5969C3.33856 21.4392 2.38961 21.1071 1.64124 20.3588C0.89288 19.6104 0.560763 18.6614 0.403135 17.489C0.249972 16.3498 0.249985 14.8942 0.25 13.0564V10.9436C0.249985 9.10582 0.249972 7.65019 0.403135 6.51098C0.560763 5.33855 0.89288 4.38961 1.64124 3.64124C2.38961 2.89288 3.33856 2.56076 4.51098 2.40313C4.7439 2.37182 4.99006 2.34691 5.25 2.32709V1.5C5.25 1.08579 5.58579 0.75 6 0.75ZM4.71085 3.88976C3.70476 4.02502 3.12511 4.27869 2.7019 4.7019C2.27869 5.12511 2.02502 5.70476 1.88976 6.71085C1.86685 6.88123 1.8477 7.06061 1.83168 7.25H20.1683C20.1523 7.06061 20.1331 6.88124 20.1102 6.71085C19.975 5.70476 19.7213 5.12511 19.2981 4.7019C18.8749 4.27869 18.2952 4.02502 17.2892 3.88976C16.2615 3.75159 14.9068 3.75 13 3.75H9C7.09318 3.75 5.73851 3.75159 4.71085 3.88976ZM1.75 11C1.75 10.146 1.75032 9.40273 1.76309 8.75H20.2369C20.2497 9.40273 20.25 10.146 20.25 11V13C20.25 14.9068 20.2484 16.2615 20.1102 17.2892C19.975 18.2952 19.7213 18.8749 19.2981 19.2981C18.8749 19.7213 18.2952 19.975 17.2892 20.1102C16.2615 20.2484 14.9068 20.25 13 20.25H9C7.09318 20.25 5.73851 20.2484 4.71085 20.1102C3.70476 19.975 3.12511 19.7213 2.7019 19.2981C2.27869 18.8749 2.02502 18.2952 1.88976 17.2892C1.75159 16.2615 1.75 14.9068 1.75 13V11Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                      {"Congés & Autorisations"}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu === "element" ? "rotate-90" : "rtl:rotate-180"
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "element" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <Link href="/dashboard/conges/dashboard">
                        {"Tableau de bord"}
                      </Link>
                    </li>
                    <span>CONGÉS</span>
                    <li>
                      <Link href="/dashboard/conges/leaveRequest">
                        {"Demande de congés"}
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/conges/validLeave">
                        {"Liste des congés"}
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/conges/validPermission">
                        {"Liste des demandes"}
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/conges/holiday">
                        {"Jours fériés"}
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/conges/typeOfLeave">
                        {"Type de demandes"}
                      </Link>
                    </li>
                      <div>
                        <span>AUTRES </span>
                        <li>
                          <Link href="/dashboard/conges/validPermission/nursing/add">
                            {"Heures d'allaitement"}
                          </Link>
                        </li>
                      </div>
                  </ul>
                </AnimateHeight>
              </li>

                <>
                  <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                    <svg
                      className="hidden h-5 w-4 flex-none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>{"CVthèque"}</span>
                  </h2>

                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${
                        currentMenu === "users" ? "active" : ""
                      } nav-link group w-full`}
                      onClick={() => toggleMenu("users")}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.88558 3.36262C11.8283 0.545795 16.5864 0.545795 19.5291 3.36262C19.8283 3.64904 19.8387 4.1238 19.5523 4.42302C19.2658 4.72225 18.7911 4.73262 18.4919 4.4462C16.1292 2.1846 12.2855 2.1846 9.9228 4.4462L3.51861 10.5764C3.21939 10.8628 2.74463 10.8524 2.45821 10.5532C2.17179 10.254 2.18216 9.77924 2.48139 9.49282L8.88558 3.36262ZM15.2666 6.45089C15.553 6.15167 16.0278 6.14129 16.327 6.42771C17.5829 7.62989 17.5829 9.59316 16.327 10.7953L8.43612 18.3486C8.13689 18.635 7.66213 18.6247 7.37571 18.3254C7.08929 18.0262 7.09967 17.5515 7.39889 17.265L15.2898 9.71175C15.9286 9.1002 15.9286 8.12285 15.2898 7.5113C14.9905 7.22488 14.9802 6.75012 15.2666 6.45089Z"
                            fill="currentColor"
                          />
                          <path
                            opacity="0.5"
                            d="M18.4914 4.44598C20.8356 6.68987 20.8356 10.3138 18.4914 12.5577L10.5433 20.1657C9.0333 21.6111 6.57204 21.6111 5.06201 20.1657C3.57048 18.738 3.57048 16.4373 5.06201 15.0096L12.8957 7.51108C13.5531 6.88183 14.6319 6.88183 15.2893 7.51108C14.9904 7.22463 14.9803 6.74991 15.2666 6.45078C15.5479 6.15692 16.0108 6.14164 16.3107 6.4125C15.0722 5.24304 13.0906 5.24804 11.8585 6.42749L4.02478 13.926C1.91622 15.9444 1.91622 19.2309 4.02478 21.2493C6.11485 23.2499 9.4905 23.2499 11.5806 21.2493L19.5286 13.6413C22.4848 10.8116 22.4898 6.21268 19.5438 3.37695C19.8286 3.66467 19.8339 4.12866 19.5523 4.42291C19.2658 4.72213 18.7906 4.7324 18.4914 4.44598Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {"CVthèque"}
                        </span>
                      </div>

                      <div
                        className={
                          currentMenu === "users"
                            ? "rotate-90"
                            : "rtl:rotate-180"
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5L15 12L9 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "users" ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/cvtheques/dashboard">
                            {"Tableau de bord"}
                          </Link>
                        </li>
                        <span>PAGES</span>
                        <li>
                          <Link href="/dashboard/cvtheques/offres">
                            {"Offres"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/cvtheques/candidature/list">
                            {"Candidatures"}
                          </Link>
                        </li>
                        <span>LISTES TERMS</span>
                        <li>
                          <Link href="/dashboard/cvtheques/terms/civility">
                            {"Civilités"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/cvtheques/terms/contrat">
                            {"Contrats"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/cvtheques/terms/disponibility">
                            {"Disponibilité"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/cvtheques/terms/domaine">
                            {"Domaines"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/cvtheques/terms/region">
                            {"Régions"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/cvtheques/terms/status">
                            {"Statuts"}
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </>
            
                <>
                  <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                    <svg
                      className="hidden h-5 w-4 flex-none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>{"Paramètres"}</span>
                  </h2>

                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${
                        currentMenu === "item" ? "active" : ""
                      } nav-link group w-full`}
                      onClick={() => toggleMenu("item")}
                    >
                      <div className="flex items-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.0646 17.9997C16.4827 18.0354 20.0354 14.4827 19.9997 10.0646C19.9641 5.64642 16.3536 2.03592 11.9354 2.00027C7.51731 1.96461 3.96461 5.51731 4.00027 9.93545C4.03592 14.3536 7.64642 17.9641 12.0646 17.9997Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            opacity="0.5"
                            d="M12.8569 7L9.99972 10H13.9997L11.1426 13"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            stroke="currentColor"
                            opacity="0.5"
                            d="M11.25 22C11.25 22.4142 11.5858 22.75 12 22.75C12.4142 22.75 12.75 22.4142 12.75 22H11.25ZM11.1173 20.9239L10.8303 21.6168L10.8303 21.6168L11.1173 20.9239ZM10.5761 20.3827L9.88321 20.6697H9.88321L10.5761 20.3827ZM13.4239 20.3827L14.1168 20.6697L14.1168 20.6697L13.4239 20.3827ZM12.8827 20.9239L13.1697 21.6168L13.1697 21.6168L12.8827 20.9239ZM11.25 21V22H12.75V21H11.25ZM12.75 18V19.5H14.25V18H12.75ZM11.25 19.5V18H9.75V19.5H11.25ZM12 20.25C11.7568 20.25 11.6119 20.2496 11.5039 20.2422C11.4026 20.2353 11.3896 20.2249 11.4043 20.231L10.8303 21.6168C11.0288 21.699 11.2241 21.7266 11.4018 21.7387C11.5727 21.7504 11.7773 21.75 12 21.75V20.25ZM9.75 19.5C9.75 19.7227 9.74959 19.9273 9.76125 20.0982C9.77338 20.2759 9.80099 20.4712 9.88321 20.6697L11.269 20.0957C11.2751 20.1104 11.2647 20.0974 11.2578 19.9961C11.2504 19.8881 11.25 19.7432 11.25 19.5H9.75ZM11.4043 20.231C11.3431 20.2056 11.2944 20.1569 11.269 20.0957L9.88321 20.6697C10.0608 21.0985 10.4015 21.4392 10.8303 21.6168L11.4043 20.231ZM12.75 19.5C12.75 19.7432 12.7496 19.8881 12.7422 19.9961C12.7353 20.0974 12.7249 20.1104 12.731 20.0957L14.1168 20.6697C14.199 20.4712 14.2266 20.2759 14.2387 20.0982C14.2504 19.9273 14.25 19.7227 14.25 19.5H12.75ZM12 21.75C12.2227 21.75 12.4273 21.7504 12.5982 21.7387C12.7759 21.7266 12.9712 21.699 13.1697 21.6168L12.5957 20.231C12.6104 20.2249 12.5974 20.2353 12.4961 20.2422C12.3881 20.2496 12.2432 20.25 12 20.25V21.75ZM12.731 20.0957C12.7056 20.1569 12.6569 20.2056 12.5957 20.231L13.1697 21.6168C13.5985 21.4392 13.9392 21.0985 14.1168 20.6697L12.731 20.0957Z"
                            fill="#1C274C"
                          />
                        </svg>
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {"Paramètres"}
                        </span>
                      </div>

                      <div
                        className={
                          currentMenu === "item"
                            ? "rotate-90"
                            : "rtl:rotate-180"
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5L15 12L9 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "item" ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/parametre/teams">
                            {"Equipes"}
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "item" ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/parametre/employeeFunctions">
                            {"Fonctions"}
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "item" ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/parametre/terms/diplome">
                            {"Diplômes"}
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "item" ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/parametre/terms/technologies">
                            {"Technologies"}
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "item" ? "auto" : 0}
                    >
                      <span className="text-gray-500"> TABLEAU DE BORD </span>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/parametre/durables/sustainable-initiatives">
                            {"Tendance Des Initiatives Durables"}
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "item" ? "auto" : 0}
                    >
                      <span className="text-gray-500"> FICHE DE PROFIL </span>

                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/parametre/strengh">
                            {"Points Forts"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/projets">
                            {"Projets"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/client">
                            {"Client"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/langue">
                            {"Langue"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/niveau">
                            {"Niveau de la langue"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/competences">
                            {"Compétences"}
                          </Link>
                        </li>
                        <li>
                        <Link href="/dashboard/parametre/company">
                            {('Société')}
                        </Link>
                    </li>
                      </ul>
                    </AnimateHeight>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "item" ? "auto" : 0}
                    >
                      <span className="text-gray-500">MODÈLE FICHE D&apos;ÉVALUATION</span>

                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/parametre/modeleFiche">
                            {"Modéles de Fiches"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/annexe">
                            {"Annexes"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/categorie">
                            {"Categories"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/sousCategorie">
                            {"Sous catégories"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/champ">
                            {"Champs"}
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard/parametre/fonctionFiche">
                            {"Fonctions"}
                          </Link>
                        </li>
                     
                      </ul>
                    </AnimateHeight>
                 
                  </li>
                </>
              
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
