import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Sidebar({ ...props }) {
  return (
    <ul className="menu bg-base-200 w-2/12 text-slate-900">
      <li>
        <Link className="text-slate-900">
          <FolderOpenIcon className="size-5" /> Dashboard
        </Link>
      </li>
      <li>
        <details open>
          <summary>Parent</summary>
          <ul>
            <li>
              <Link className="text-slate-900">Submenu 1</Link>
            </li>
            <li>
              <Link className="text-slate-900">Submenu 2</Link>
            </li>
            <li>
              <details open>
                <summary>Parent</summary>
                <ul>
                  <li>
                    <Link className="text-slate-900">Submenu 1</Link>
                  </li>
                  <li>
                    <Link className="text-slate-900">Submenu 2</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link className="text-slate-900">Item 3</Link>
      </li>
    </ul>
  );
}
