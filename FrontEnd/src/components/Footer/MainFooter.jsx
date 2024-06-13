import React from 'react'
import '../Footer/MainFooter.css'

const MainFooter = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="copyright">
                    &copy; JewelryAuction
                </div>
            </div>
        </div>
    )
};

export default MainFooter
