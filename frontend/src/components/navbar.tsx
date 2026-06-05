import { Link, useLocation, useSearchParams } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import { useEffect, useState } from "react"
import { CgShoppingCart } from "react-icons/cg"


const NavBar = () => {
    const { } = useAppData()
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
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <Link to={'/'} className="text-2xl font-bold text-[#W23744] cursor-pointer">
                    fIESTYfIESTA
                </Link>
                <div className="flex items-center">
                    <Link to={'/cart'} className="relative"></Link>
                    <CgShoppingCart className="h-6 w-6 text-[#E23744]"></CgShoppingCart>
                </div>
            </div>
        </div>
    )
}

export default NavBar