import styles from '../styles/Navbar.module.scss'
import button, { useEffect, useState } from 'react'
import Link from 'next/link';
import PropTypes from 'prop-types'

export default function Navbar({title, navbar_list, ...props}) {

    const [init_status, setAppStartStatus] = useState(true);
    const [menu_clicked, toggleMenu] = useState(false);
    const [active, setActive] = useState("");

    const menuClick = (event) => {
        setAppStartStatus(false)
        toggleMenu(!menu_clicked)
        console.log("Button Clicked")
    };

    // Map to dynamically populate navigation links based on received props
    const listNavbarItems = navbar_list.map((nav_item) => 
        <li 
            key={nav_item["id"]}
            className={`
                    ${nav_item["title"] == active?'bg-secondary_color font-semibold':'text-text_nav_color'}
                        flex h-4 py-4 px-2 items-center rounded-md mx-0
                    `}
        >
            <Link onClick={() => {setActive(nav_item["title"]);}} href={`/${nav_item["id"]}`} className={`flex-grow ${styles.navlink_item}`}>
                {nav_item["title"]}
            </Link>
        </li>
    )
    useEffect(() =>{
        
    });
    return (
        <nav className='w-full text-text_nav_color bg-primary_color border-b-2  border-b-gray-100 flex items-center py-3 sm:h-[100px] fixed top-0 z-20'>
            <div className='px-3 sm:px-20 w-full h-full flex justify-between items-center max-w-4xl mx-auto'>
                <Link
                    href="/"
                    className="flex items-center h-full gap-2 hover:font-bold hover:text-text_nav_color"
                    onClick={()=>{
                        setActive("");
                        window.scrollTo(0,0);
                    }}
                >
                    {title}
                </Link>
                <ul className='list-none h-full sm:flex sm:items-center sm:justify-center hidden gap-2 hover:text-text_nav_color'>
                    {listNavbarItems}
                </ul>
                <div className='flex sm:hidden'>
                    <img 
                        alt="menu"
                        className='w-8 h-8 object-contain cursor-pointer text-white
                                    transition-all ease-linear delay-750'
                        src={!menu_clicked?"/menu-open.svg":"/menu-close.svg"}
                        
                        onClick={(event)=>{
                            menuClick(event);
                        }}
                        />

                    <ul className={`${!menu_clicked?"hidden":"flex"} px-0 w-50 fixed z-20 right-0 top-16 list-none rounded-b-lg
                                     flex-col items-center justify-center bg-primary_color 
                                 hover:text-text_nav_color gap-2`}>
                        {
                            navbar_list.map((nav_item) => 
                                <li 
                                    key={nav_item["id"]}
                                    className={`
                                            ${nav_item["title"] == active?'bg-secondary_color font-semibold':'text-text_nav_color'}
                                                flex h-4 py-4 px-2 items-center rounded-md mx-0 w-full
                                            `}
                                >
                                    <Link onClick={(event) => {
                                            setActive(nav_item["title"]);
                                            menuClick(event);
                                        }} 
                                        href={`/${nav_item["id"]}`} className={`flex justify-center flex-grow ${styles.navlink_item}`}>
                                        {nav_item["title"]}
                                    </Link>
                                </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
        
    );
} 


Navbar.propTypes = {
    title: PropTypes.string,
    navbar_list: PropTypes.array
}