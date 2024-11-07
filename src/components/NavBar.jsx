import { Link } from "react-router-dom";

const NavBar = () => {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="navbar fixed w-full bg-primary text-primary-content z-50 shadow-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="font-medium"><Link to="/features">Features</Link></li>
                        <li className="font-medium"><Link to="/upcoming">What's Next</Link></li>
                        <li className="font-medium"><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <Link onClick={scrollToTop} to='/' className="btn btn-ghost text-xl">ExpressBills</Link>
            </div>
            <div className="navbar-center hidden lg:flex">

                <ul className="menu lg:menu-horizontal">
                    <li className="font-medium">
                        <Link to="/features">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Features
                        </Link>
                    </li>
                    <li className="font-medium">
                        <Link to="/upcoming">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Upcoming
                            <span className="badge badge-sm badge-warning">NEW</span>
                        </Link>
                    </li>
                    <li className="font-medium">
                        <Link to="/contact">
                            Contact
                            <span className="badge badge-xs badge-info"></span>
                        </Link>
                    </li>
                </ul>

            </div>
            <div className="navbar-end">
                <button onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }} className="btn btn-neutral">Reset</button>
            </div>
        </div>
    )
}

export default NavBar