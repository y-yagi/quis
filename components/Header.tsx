import Link from "next/link";

const Header = () => {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
