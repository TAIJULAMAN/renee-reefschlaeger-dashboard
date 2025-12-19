import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

export default function Content() {
    return (
        <div className="w-full mx-auto">
            {/* Card */}
            <div className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-5 py-3">
                    <h1 className="text-white text-2xl font-bold">Content Management</h1>
                </div>

                {/* List */}
                <ul className="divide-y divide-gray-200">
                    {/* Popular Day Trips */}
                    <li>
                        <Link
                            to="/content/popular-day-trips"
                            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                        >
                            <span className="text-gray-800 text-base">Popular Day Trips</span>
                            <IoChevronForward className="text-gray-500" />
                        </Link>
                    </li>
                    {/* Popular Multi-Day Tours */}
                    <li>
                        <Link
                            to="/content/popular-multi-day-tours"
                            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                        >
                            <span className="text-gray-800 text-base">Popular Multi-Day Tours</span>
                            <IoChevronForward className="text-gray-500" />
                        </Link>
                    </li>
                    {/* Private Transfers */}
                    <li>
                        <Link
                            to="/content/private-transfers"
                            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                        >
                            <span className="text-gray-800 text-base">Private Transfers</span>
                            <IoChevronForward className="text-gray-500" />
                        </Link>
                    </li>
                    {/* Popular Transfer Routes */}
                    <li>
                        <Link
                            to="/content/popular-transfer-routes"
                            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                        >
                            <span className="text-gray-800 text-base">Popular Transfer Routes</span>
                            <IoChevronForward className="text-gray-500" />
                        </Link>
                    </li>
                    {/* Day Trips */}
                    <li>
                        <Link
                            to="/content/day-trips"
                            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                        >
                            <span className="text-gray-800 text-base">Day Trips</span>
                            <IoChevronForward className="text-gray-500" />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
