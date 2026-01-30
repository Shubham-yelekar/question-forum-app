import {
  FeatherIcon,
  PenIcon,
  CircleUserRound,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface LinksTypes {
  name: string;
  url: string;
  icon: LucideIcon;
}
const LeftAsideLinks: LinksTypes[] = [
  {
    name: "Write Question",
    url: "/write",
    icon: FeatherIcon,
  },
  {
    name: "Your Question",
    url: "/questions",
    icon: PenIcon,
  },
  {
    name: "Profile",
    url: "/profile",
    icon: CircleUserRound,
  },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="grid grid-cols-12  ">
        {/* Left Sidebar */}
        <aside className="col-span-3 hidden lg:block sticky top-14 h-fit">
          <div className="flex flex-col border-b border-gray-300">
            {LeftAsideLinks.map((items) => (
              <Link
                key={`${items.name}-${items.url} `}
                href={items.url}
                className="w-full p-2 cursor-pointer "
              >
                <button className="flex items-center cursor-pointer font-semibold  transition-all ease-in duration-75 font-sans whitespace-nowrap  select-none gap-x-2  text-sm leading-5 p-3 w-full rounded-xl  hover:bg-emerald-100">
                  <items.icon size={18} />
                  {items.name}
                </button>
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Feed */}
        <main className="col-span-12 border-x-1 border-gray-300 lg:col-span-6 space-y-6">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="col-span-3 hidden lg:block sticky top-14 h-fit"></aside>
      </div>
    </div>
  );
};

export default layout;
