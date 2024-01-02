import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';
import SideBar from '../sidebar/SideBar';
import links from './links.json';

const Header = () => {
    const [state, setState] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const { currentUser } = useSelector(state => state.user);

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

    console.log('Current User:', currentUser);

    return (
        <>
            <nav className={`relative bg-white w-full md:static md:text-sm ${menuOpen ? 'shadow-lg rounded-b-xl md:shadow-none' : ''} border-b border-grey-100`} style={{ position: 'relative', zIndex: '10' }}>
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center">
                            <Link to="/">
                                <img className="image mr-4" src="/logo.png" alt="Srikanth Estates logo" />
                            </Link>
                            <div className={`nav-menu pb-2 mt-4 md:block md:pb-0 md:mt-0 ${menuOpen ? 'block' : 'hidden'}`} ref={dropdownRef} style={{ zIndex: 2 }}>
                                <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                                    {links.navigation.map((item, idx) => (
                                        <li key={idx} className="dropdown">
                                            <Link to={item.path} className={`w-full text-base flex items-center justify-between gap-1 text-gray-700 hover:text-indigo-600 dropdown-btn ${activeDropdown === idx ? 'text-indigo-600' : ''}`} onMouseEnter={() => toggleDropdown(idx)} onClick={() => {
                                                setState(false);
                                                setMenuOpen(false);
                                            }} >
                                                {item.title}
                                            </Link>
                                            {item.isDrapdown && activeDropdown === idx && (
                                                <div className="dropdown-content mt-2 md:mt-0 inset-x-0 top-full w-full md:absolute md:border-y md:shadow-md bg-white">
                                                    <ul className="max-w-screen-xl mx-auto flex items-start gap-10 md:p-8">
                                                        {links[item.navs].map((dropdownItem, idx) => (
                                                            <li key={idx} className={`relative ${idx < links[item.navs].length - 1 ? 'pr-20' : ''}`}>
                                                                <p className="text-black font-bold text-sm">{dropdownItem.label}</p>
                                                                <ul className="mt-4 space-y-1">
                                                                    {dropdownItem.navs.map((navItem, idx) => (
                                                                        <li key={idx} className="group">
                                                                            <Link to={navItem.path} onClick={() => {
                                                                                setState(false);
                                                                                setMenuOpen(false);
                                                                            }} className="flex gap-3 items-center">
                                                                                <div>
                                                                                    <span className="text-indigo-600 group-hover:underline text-sm font-medium md:text-sm">{navItem.title}</span>
                                                                                </div>
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                                {idx < links[item.navs].length - 1 && <div className="absolute inset-y-0 right-0 border-r border-gray-300" style={{ height: '110px' }}></div>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-6">
                            {currentUser ? (
                                <>
                                    <button onClick={() => { setState(!state); }} className="focus:outline-none active:outline-none transform active:scale-100">
                                        <img className='rounded-full h-10 w-10 object-cover' src={currentUser?.others?.photo || currentUser?.photo} alt='profile' onError={(e) => { e.target.onerror = null; e.target.src = "default_image_url"; }} />
                                    </button>
                                    <SideBar isOpen={state} onClose={() => setState(false)} />
                                </>
                            ) : (
                                <Link to="/login" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow"> Log in </Link>
                            )}
                        </div>
                    </div >

                </div >
            </nav >
        </>
    );
};

export default Header;
