"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import Dropdown from "../Dropdown";
import { IRootState } from "@/store";
import {
  toggleLocale,
  toggleRTL,
  toggleSidebar,
  toggleTheme,
} from "@/store/themeConfigSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import themeConfig from "@/theme.config";

const Header = () => {
    const [search, setSearch] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch();
    const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  useEffect(() => {
    console.log(localStorage.getItem("token"))
    if(localStorage.getItem("token")===null){
      router.push("/")
    }
});
  

  return (
    <header
      className={`z-40 ${
        themeConfig.semidark && themeConfig.menu === "horizontal" ? "dark" : ""
      }`}
    >
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
            <Link
              href="/dashboard"
              className="main-logo flex shrink-0 items-center"
            >
              
            </Link>
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7L4 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  opacity="0.5"
                  d="M20 12L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20 17L4 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="hidden ltr:mr-2 rtl:ml-2 sm:block">
            <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
              <li>
                <Link
                  href="/dashboard/bandeCommande/calendrier"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      opacity="0.5"
                      d="M7 4V2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      opacity="0.5"
                      d="M17 4V2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      opacity="0.5"
                      d="M2 9H22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </li>
              
            </ul>
          </div>
          <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
             
               
            
              <button
                type="button"
                className="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden"
              >
                <svg
                  className="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="11.5"
                    cy="11.5"
                    r="9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  <path
                    d="M18.5 18.5L22 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
           
            <button type="button" onClick={()=>{localStorage.clear();router.push('/')}}>
            <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="black"  
    className="w-8 h-8"
>
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12h6m-6 0l4-4m-4 4l4 4M20 12a8 8 0 10-8 8"
    />
</svg>
</button>


            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="relative group block"
                
              >
                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      

                      <div className="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 className="text-base">
                         
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          <span className="text-xs">
                          
                          </span>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/effectifs/myProfile"
                      className="dark:hover:text-white"
                    >
                      <svg
                        className="ltr:mr-2 rtl:ml-2 shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="6"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Profile
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link
                    href={""}
                      className="!py-3 text-danger"
                      //onClick={() => logout()}
                    >
                      <svg
                        className="rotate-90 ltr:mr-2 rtl:ml-2 shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Déconnexion
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* horizontal menu */}
        <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white py-1.5 px-6 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8">
          <li className="menu nav-item relative">
            <Link href="/dashboard" type="button" className="nav-link">
              <div className="flex items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
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
                <span className="px-1">{"dashboard"}</span>
              </div>
            </Link>
          </li>
          {localStorage.getItem("role")==="ADMIN" &&
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
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
                <span className="px-1">{"Gestion des Personnels"}</span>
              </div>
              <div className="right_arrow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-90"
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
           <ul className="sub-menu">
                <li>
                  <Link href="/dashboard/effectifs/personnels">
                    {"Personnels"}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/effectifs/clients">
                    {"Clients"}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/effectifs/machine">
                    {"Machines"}
                  </Link>
                </li>
              </ul>
             
          
            
          </li>
      }
      {(localStorage.getItem("role")==="ADMIN" ||  localStorage.getItem("role")==="RESPONSABLE_PRODUCTION") &&  <li className="menu nav-item relative">
            <button type="button" className="nav-link">
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
                <span className="px-1">{"Gestions de Stock"}</span>
              </div>
              <div className="right_arrow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-90"
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
            <ul className="sub-menu">
              <li>
                <Link href="/dashboard/stock/articles">
                  {"Articles"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard/stock/mp">
                  {"Matiere premiere"}
                </Link>
              </li>  
            </ul>
          </li>}
         
         
            <li className="menu nav-item relative">
              <button type="button" className="nav-link">
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
                  <span className="px-1">{"Ordre de fabrication"}</span>
                </div>
                <div className="right_arrow">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-90"
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
              <ul className="sub-menu">
                {(localStorage.getItem("role")==="ADMIN" ||  localStorage.getItem("role")==="RESPONSABLE_PRODUCTION") &&<li>
                  <Link href="/dashboard/bandeCommande/dashboard">
                    {"Tableau de bord"}
                  </Link>
                </li>}
                
                <li>
                  <Link href="/dashboard/bandeCommande/calendrier">
                    {"Calendrier"}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/bandeCommande/bandeCommandes">
                    {"Bon de Commande"}
                  </Link>
                </li>

                <li>
                  <Link href="/dashboard/bandeCommande/bandeLivraison">
                    {"Bon de Livraison"}
                  </Link>
                </li>
                
               
               
              </ul>
            </li>
 
        
          
          </ul>
      </div>
    </header>
    
  );
};

export default Header;
