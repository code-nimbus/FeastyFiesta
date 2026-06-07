import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { BiLogOut, BiMapPin, BiPackage } from "react-icons/bi";

const Account = () => {
    const { user, setUser, setIsAuth } = useAppData();

    const firstLetter = user?.name?.charAt(0).toUpperCase();

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.setItem("token", "");
        setUser(null);
        setIsAuth(false);
        navigate("/login");
        toast.success("logout success");
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-16">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-4 px-8 py-7">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-700 text-xl font-semibold text-white">
                        {firstLetter}
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                            {user?.name}
                        </h2>
                        <p className="truncate text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>

                <div className="border-t border-gray-200">
                    <div
                        className="flex cursor-pointer items-center gap-4 px-8 py-5 hover:bg-gray-50"
                        onClick={() => navigate("/orders")}
                    >
                        <BiPackage className="h-5 w-5 text-green-700" />
                        <span className="text-sm font-semibold text-gray-900">
                            Your Orders
                        </span>
                    </div>

                    <div
                        className="flex cursor-pointer items-center gap-4 px-8 py-5 hover:bg-gray-50"
                        onClick={() => navigate("/address")}
                    >
                        <BiMapPin className="h-5 w-5 text-green-700" />
                        <span className="text-sm font-semibold text-gray-900">
                            Address
                        </span>
                    </div>

                    <div
                        className="flex cursor-pointer items-center gap-4 px-8 py-5 hover:bg-gray-50"
                        onClick={logoutHandler}
                    >
                        <BiLogOut className="h-5 w-5 text-green-700" />
                        <span className="text-sm font-semibold text-gray-900">
                            Logout
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;