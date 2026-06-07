import { Link, useLocation, useSearchParams } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import { useEffect, useState } from "react"
import { CgShoppingCart } from "react-icons/cg";
import { BiMapPin, BiSearch } from "react-icons/bi";



const NavBar = () => {
    const { isAuth, city } = useAppData()
    const currLocation = useLocation()

    const isHomePage = currLocation.pathname === "/"

    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search) {
                setSearchParams({ search })
            } else {
                setSearchParams({})
            }
        }, 400)

        return () => clearTimeout(timer)
    }, [search])
    return (
        <div className="w-full bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
                <Link to={'/'} className="text-2xl font-bold text-[#W23744] cursor-pointer">
                    fIESTYfIESTA
                </Link>
                <div className="flex items-center">
                    <Link to={'/cart'} className="relative">
                        <CgShoppingCart className="h-6 w-6 text-[#2E7D32]"></CgShoppingCart>
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center
                    justify-center rounded-full bg-[#2E7D32] text-xs font-semibold text-white">
                            0
                        </span>
                    </Link>
                    {
                        isAuth ? (
                            <Link to="/account" className="font-medium text-green-700">
                                &nbsp;Account
                            </Link>
                        ) : (
                            <Link to="/login" className="font-medium text-[#23744]">
                                Login
                            </Link>
                        )
                    }
                </div>
            </div>
            {/* Search Bar */}
            {
                isHomePage &&
                <div className="px-5 pb-3">
                    <div className="mx-auto flex max-w-7xl items-center rounded-lg border shadow-sm">
                        <div className="flex items-center gap-2 ox-3 border-r text-gray-700">
                            <BiMapPin className="h-4 w-4 text-[#2E7D32" />
                            <span className="text-sm truncate max-w-35">{city} &nbsp;</span>
                        </div>
                        <div className="flex flex-1 items-center gap-2 px-3">
                            <BiSearch className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for restaurant"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full py-2 text-sm outline-none"
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default NavBar