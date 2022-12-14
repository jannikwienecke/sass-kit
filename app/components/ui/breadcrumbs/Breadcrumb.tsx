import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface MenuItem {
  title: string;
  routePath?: string;
}

interface Props {
  menu: MenuItem[];
  className?: string;
  home?: string;
}

export default function Breadcrumb({ className = "", home = "/app/dashboard", menu = [] }: Props) {
  const { t } = useTranslation("translations");
  return (
    <nav className={clsx(className, "flex bg-white border-b border-gray-200 overflow-x-auto")} aria-label="Breadcrumb">
      <ol className="max-w-screen-xl w-full px-4 flex space-x-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link to={home} className="text-gray-400 hover:text-gray-500">
              {/*Heroicon name: solid/home */}
              <svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="sr-only">{t("shared.home")}</span>
            </Link>
          </div>
        </li>
        {menu.map((item, idx) => {
          return (
            <li key={idx} className="flex">
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 w-5 sm:w-6 h-full text-gray-200"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>

                {(() => {
                  if (!item.routePath) {
                    return <div className="ml-2 sm:ml-4 sm:text-sm font-medium text-gray-500 hover:text-gray-700 select-none truncate">{item.title}</div>;
                  } else {
                    return (
                      <Link to={item.routePath} className="ml-2 sm:ml-4 sm:text-sm font-medium text-gray-500 hover:text-gray-700 truncate">
                        {item.title}
                      </Link>
                    );
                  }
                })()}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
