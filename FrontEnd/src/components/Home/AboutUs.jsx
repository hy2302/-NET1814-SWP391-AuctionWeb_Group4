import React, { useState, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import './AboutUs.css'

function AboutUs () {
    const [openIndex, setOpenIndex] = useState(0);

    const handleClick = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    const items = [
        { title: 'Introduction', content: 'We are a leading auction platform dedicated to providing a seamless and secure auction experience for both buyers and sellers. Our team is passionate about delivering exceptional service and helping you find unique and valuable items.'},
        { title: 'Mission and Vision', content: 'Our mission is to connect buyers and sellers through a transparent and trustworthy auction process, ensuring satisfaction and value for all parties involved.'},
        { title: 'Services Offered', content: 'We host various types of auctions including live auctions, silent auctions, and online-only auctions to cater to different preferences and needs.'},
    ];

    return (
        <div className="about-us-section-wrapper" id="about">
            <div className="about-us-container">
                <div className="about-us">
                    <h1 className="primary-heading">ABOUT US</h1>
                    <h2>What Makes Us Today?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravid risus commodo.</p>
                </div>
                <div className="accordion">
                    {items.map((item, index) => (
                        <AccordionItem key={index} title={item.title} content={item.content} isOpen={openIndex === index} onClick={() => handleClick(index)}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('0px');

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setContentHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, [isOpen]);

    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={onClick}>
                <h2>{title}</h2>
                <p>{isOpen ? '-' : '+'}</p>
            </div>
            <CSSTransition in={isOpen} timeout={300} classNames="accordion-content" unmountOnExit>
                <div ref={contentRef} className="accordion-content" style={{ maxHeight: isOpen ? contentHeight : '0px' }}>
                    {content}
                </div>
            </CSSTransition>
        </div>
    );
};