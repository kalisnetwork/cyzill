import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { useSelector } from 'react-redux'

const BuyNavs = [
    {
        label: "Farmville homes for sale", navs: [
            {
                title: "Homes For Sale",
                path: "/homes/for-sale",
            },
            {
                title: "Open Houses",
                path: "/homes/open-houses",
            },
            {
                title: "Coming Soon",
                path: "/homes/coming-soon",
            },
        ]
    },
    {
        label: "Another category",
        navs: [
            {
                title: "Link 1",
                path: "/path/to/link1",
            },
            {
                title: "Link 2",
                path: "/path/to/link2",
            },
            // ... more links here ...
        ]
    },
    {
        label: "Another category",
        navs: [
            {
                title: "Link 1",
                path: "/path/to/link1",
            },
            {
                title: "Link 2",
                path: "/path/to/link2",
            },
            // ... more links here ...
        ]
    },
    {
        label: "Another category",
        navs: [
            {
                title: "Link 1",
                path: "/path/to/link1",
            },
            {
                title: "Link 2",
                path: "/path/to/link2",
            },
            // ... more links here ...
        ]
    },
]
const SellNavs = [
    {
        label: "Sell Your Property", navs: [
            {
                title: "Sell Your House",
                path: "/homes/for-sale",
            },
            {
                title: "Find Sellers Agent",
                path: "/homes/open-houses",
            },
            {
                title: "Coming Soon",
                path: "/homes/coming-soon",
            },
        ]
    },
]
const RentNavs = [
    {
        label: "Rent You Houses", navs: [
            {
                title: "Houses for Rent",
                path: "/homes/for-sale",
            },
            {
                title: "Rental Buildings",
                path: "/homes/open-houses",
            },
            {
                title: "Apartments for Rent",
                path: "/homes/coming-soon",
            },
            {
                title: "Homes For Sale",
                path: "/homes/for-sale",
            },
        ]
    },
]

const navigation = [
    { title: "Buy", path: "/homes", isDrapdown: true, navs: BuyNavs },
    { title: "Sell", path: "/sell", isDrapdown: true, navs: SellNavs },
    { title: "Rent", path: "/homes/for-rental", isDrapdown: true, navs: RentNavs },
    { title: "Home Loans", path: "/home-loans", isDrapdown: false },
    { title: "Agent Finder", path: "/agent-finder", isDrapdown: false },
]

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleDocumentClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setActiveDropdown(null);
        }
    };

    const toggleDropdown = (idx) => {
        setActiveDropdown(idx);
    };

    console.log('User photo URL:', currentUser ? currentUser.photo : 'No user logged in');
    console.log('Current User:', currentUser);
    return (
        <>
            <nav className={`relative bg-white w-full md:static md:text-sm ${menuOpen ? 'shadow-lg rounded-b-xl md:shadow-none' : ''} border-b border-grey-100`} style={{ position: 'relative' }}>
                <div className="items-center gap-x-20 px-5 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-4 md:py-3 md:block">
                        <Link to="/">
                            <img
                                className="image"
                                src="/logo.png"
                                alt="Srikanth Estates logo"
                            />
                        </Link>
                        <div className="md:hidden">
                            <button className="text-black" onClick={() => setMenuOpen(!menuOpen)}>
                                {menuOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className={`nav-menu flex-1 pb-2 mt-4 md:block md:pb-0 md:mt-0 ${menuOpen ? 'block' : 'hidden'}`} ref={dropdownRef} style={{ zIndex: 9999 }}>
                        <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                            {navigation.map((item, idx) => (
                                <li key={idx} className="dropdown">
                                    <Link
                                        to={item.path}
                                        className={`w-full text-base flex items-center justify-between gap-1 text-gray-700 hover:text-indigo-600 dropdown-btn ${activeDropdown === idx ? 'text-indigo-600' : ''}`}
                                        onMouseEnter={() => toggleDropdown(idx)}
                                    >
                                        {item.title}
                                    </Link>
                                    {item.isDrapdown && activeDropdown === idx && (
                                        <div className="dropdown-content mt-2 md:mt-0 inset-x-0 top-full w-full md:absolute md:border-y md:shadow-md bg-white">
                                            <ul className="max-w-screen-xl mx-auto flex items-start gap-10 md:p-8">
                                                {item?.navs.map((dropdownItem, idx) => (
                                                    <li key={idx} className={`relative ${idx < item.navs.length - 1 ? 'pr-20' : ''}`}>
                                                        <p className="text-black font-bold text-sm">{dropdownItem.label}</p>
                                                        <ul className="mt-4 space-y-1">
                                                            {dropdownItem.navs.map((navItem, idx) => (
                                                                <li key={idx} className="group">
                                                                    <Link to={navItem.path} className="flex gap-3 items-center">
                                                                        <div>
                                                                            <span className="text-indigo-600 group-hover:underline text-sm font-medium md:text-sm">{navItem.title}</span>
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        {idx < item.navs.length - 1 && <div className="absolute inset-y-0 right-0 border-r border-gray-300" style={{ height: '110px' }}></div>}
                                                    </li>
                                                ))}
                                            </ul>

                                        </div>
                                    )}
                                </li>
                            ))}
                            <div className="flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0 sm:hidden">
                                <Link to="/help" className="block py-3 px-4 font-medium text-center text-base md:inline">
                                    Help
                                </Link>
                                {/* Render the photo here and add logs for debugging */}
                                {currentUser?.others?.photo ? (
                                    <Link to='/profile'>
                                        <img
                                            className='rounded-full h-7 w-7 object-cover'
                                            src={currentUser.others.photo}
                                            alt='profile'
                                        />
                                    </Link>
                                ) : (
                                    <Link to="/login" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                                        Log in
                                    </Link>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;