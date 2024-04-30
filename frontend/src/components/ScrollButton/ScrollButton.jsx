import React, { useState } from 'react';
import './ScrollButton.css';
import { FaAngleUp } from "react-icons/fa";

export const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour 
                in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className="top-to-btm">
            {" "}
            {visible && (
                <FaAngleUp
                    className="icon-position icon-style"
                    onClick={scrollToTop}
                />
            )}{" "}
        </div>
    )
}
