import styles from '../styles/Navbar.module.scss'
import button, { useEffect, useState } from 'react'
import Link from 'next/link'
export default function Navbar(props) {

    const [init_status, setAppStartStatus] = useState(true)
    const [menu_toggle, toggleMenu] = useState(true)


    function menuClick(e) {
        e.preventDefault();
        setAppStartStatus(false)
        toggleMenu(!menu_toggle)
        console.log("Button Clicked")
    };

    // Map to dynamically populate navigation links based on received props
    const listNavbarItems = props.navbar_list.map((list_item) => 
        <nav key={list_item[0]}><Link href={list_item[1]} className={`flex-grow ${styles.navlink_item}`}>{list_item[0]}</Link></nav>
    )

    return (
        <div className={styles.navbar}>
            <div className={styles.content}>
                <div className={styles.navbar_menus}>
                    <div className={`site-title accent-font lightgrey-on-hover ${styles.menu_items}`}>
                        <Link href="/">Shivam Naik</Link>
                    </div>
                </div>
                <div className={`${styles.navbar_links}`}>
                    <button onClick={menuClick} style={{padding:"5px"}} className={styles.logo}><img src="/menu-button.svg" alt="Menu" className={styles.logoimg}/></button>
                    <div className={menu_toggle?styles.link_items:styles.link_items_toggled}>
                        {listNavbarItems}
                    </div>
                </div>
            </div>
        </div>
    );
} 