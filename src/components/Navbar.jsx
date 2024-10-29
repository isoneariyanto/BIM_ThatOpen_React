import { Link } from "react-router-dom";
import { BeakerIcon } from "@heroicons/react/24/solid";
import {
  AcademicCapIcon,
  AdjustmentsVerticalIcon,
  ArrowRightStartOnRectangleIcon,
  InboxArrowDownIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow px-6" id="navbar">
      <div className="navbar-start w-3/12">
        <Link to={`/`} className="text-slate-900 hover:text-slate-500 text-xl">
          LazzyBIM
        </Link>
      </div>
      <div className="navbar-center w-6/12">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="navbar-end gap-2 w-3/12">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="text-slate-900 hover:text-slate-500 flex gap-2"
          >
            <AcademicCapIcon className="size-6" />
            Your Project
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/project"}>Item 1</Link>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-72 p-2 shadow"
          >
            <li>
              <a className="justify-between text-slate-900">
                <div className="flex gap-4">
                  <InboxArrowDownIcon className="size-5" />
                  Download history
                </div>
                <span className="badge">+9</span>
              </a>
            </li>
            <li>
              <a className="justify-between text-slate-900">
                <div className="flex gap-4">
                  <UserIcon className="size-5" />
                  Profile
                </div>
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a className="justify-start gap-4 text-slate-900">
                <AdjustmentsVerticalIcon className="size-5" />
                Settings
              </a>
            </li>
            <li>
              <a className="justify-start gap-4 text-slate-900">
                <ArrowRightStartOnRectangleIcon className="size-5" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
