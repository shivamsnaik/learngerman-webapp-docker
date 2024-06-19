import styles from '../styles/Navbar.module.scss'
import button, { useEffect, useState } from 'react'
import Link from 'next/link';
import PropTypes from 'prop-types'

export default function Navbar({title, navbar_list, ...props}) {

    const [init_status, setAppStartStatus] = useState(true);
    const [menu_toggle, toggleMenu] = useState(true);
    const [active, setActive] = useState("");

    function menuClick(e) {
        e.preventDefault();
        setAppStartStatus(false)
        toggleMenu(!menu_toggle)
        console.log("Button Clicked")
    };

    // Map to dynamically populate navigation links based on received props
    const listNavbarItems = navbar_list.map((nav_item) => 
        <li 
            key={nav_item["id"]}
            className={`
                    ${nav_item["title"] == active?'text-blue-400 font-bold':'text-black'}
                `}
            onClick={() => {
                setActive(nav_item["title"]);
            }}
        >
            <Link href={`/${nav_item["id"]}`} className={`flex-grow ${styles.navlink_item}`}>
                {nav_item["title"]}
            </Link>
        </li>
    )
    useEffect(() =>{
        
    });
    return (
        <nav className='w-full text-black bg-white border-b-2  border-b-gray-100 flex items-center py-3 sm:h-[100px] fixed top-0 z-20'>
            <div className='px-3 sm:px-20 w-full flex justify-between items-center max-w-4xl mx-auto'>
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:font-bold hover:text-blue-400"
                    onClick={()=>{
                        setActive("");
                        window.scrollTo(0,0);
                    }}
                >
                    {title}
                </Link>
                <ul className='list-none hidden sm:flex gap-10'>
                    {listNavbarItems}
                </ul>
            </div>
        </nav>
    );
} 


Navbar.propTypes = {
    title: PropTypes.string,
    navbar_list: PropTypes.array
}