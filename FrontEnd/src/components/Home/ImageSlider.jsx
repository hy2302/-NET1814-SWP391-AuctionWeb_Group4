import { useCallback, useEffect, useRef, useState } from "react"
import "./ImageSlider.css"

const ImageSlider = ({ slides, parentWidth }) => {
    const timerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirst = currentIndex === 0;
        const newIndex = isFirst ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = useCallback(() => {
        const isLast = currentIndex === slides.length - 1;
        const newIndex = isLast ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides]);

    const getSlideInStyle = (slideIndex) => ({
        backgroundImage: `url(${slides[slideIndex].url})`,
    });

    const getSlidesInWidth = () => ({
        width: `${parentWidth * slides.length}px`,
        transform: `translateX(${-(currentIndex * parentWidth)}px)`,
        transition: "transform 0.5s ease-out",
    });

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            goToNext();
        }, 2000);

        return () => clearTimeout(timerRef.current);
    }, [goToNext]);

    return (
        <div className="slider">
            <div className="arrows">
                <div onClick={goToPrevious} className="arrow left-arrow">
                    ❰
                </div>
                <div onClick={goToNext} className="arrow right-arrow">
                    ❱
                </div>
            </div>
            <div className="slides-container-overflow">
                <div style={getSlidesInWidth()} className="slides-container">
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} className="slide" style={{ width: parentWidth }}>
                            <div style={getSlideInStyle(slideIndex)} className="slide-image"></div>
                            <div className="slide-content">
                                <h2>{slide.title}</h2>
                                <p>{slide.content}</p>
                                <button>Bid Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSlider
