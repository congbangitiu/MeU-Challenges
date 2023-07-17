import classNames from 'classnames/bind';
import styles from './QuoteGeneratorApp.module.scss';
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function QuoteGeneratorApp() {
    const [currentQuote, setCurrentQuote] = useState({});
    const [quotes, setQuotes] = useState([]);
    const [isIconRotated, setIconRotated] = useState(false);
    const [authorQuotes, setAuthorQuotes] = useState([]);
    const [isNextIcon, setIsNextIcon] = useState(false);

    useEffect(() => {
        fetchRandomQuotesData();
    }, []);

    const fetchRandomQuotesData = () => {
        fetch('https://quote-garden.onrender.com/api/v3/quotes')
            .then((response) => response.json())
            .then((response) => {
                setQuotes(response.data);
            })
            .catch((error) => {
                console.log('Error fetching quotes:', error);
            });
    };

    const handleRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        setCurrentQuote(randomQuote); // trả về currentQuote
        fetchQuotesByAuthor(randomQuote.quoteAuthor);
    };

    useEffect(() => {
        if (quotes.length > 0) {
            handleRandomQuote();
        }
    }, [quotes]);

    const handleRandomIconClick = () => {
        handleRandomQuote();
        setIconRotated(true);

        // Reset the rotation after a short delay
        setTimeout(() => {
            setIconRotated(false);
        }, 1000);
    };

    const fetchQuotesByAuthor = (author) => {
        fetch(`https://quote-garden.onrender.com/api/v3/quotes/?author=${author}`)
            .then((response) => response.json())
            .then((response) => {
                setAuthorQuotes(response.data);
            })
            .catch((error) => {
                console.log('Error fetching quotes:', error);
            });
    };

    const handleMoveIconClick = () => {
        setIsNextIcon(!isNextIcon);
    };

    return (
        <div className={cx('wrapper')}>
            <h1>#quotegenerator</h1>
            <div className={cx('generator')}>
                <p>random</p>
                <icon className={cx('randomIcon', { rotated: isIconRotated })} onClick={handleRandomIconClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_1_49)">
                            <path
                                d="M12 6V9L16 5L12 1V4C7.58 4 4 7.58 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13.01 6 12C6 8.69 8.69 6 12 6ZM18.76 7.74L17.3 9.2C17.74 10.04 18 10.99 18 12C18 15.31 15.31 18 12 18V15L8 19L12 23V20C16.42 20 20 16.42 20 12C20 10.43 19.54 8.97 18.76 7.74Z"
                                fill="#333333"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_49">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </icon>
            </div>

            {!isNextIcon && (
                <div className={cx('randomQuoteContainer')}>
                    <div className={cx('quoteContent')}>
                        <p>{currentQuote.quoteText}</p>
                    </div>

                    <div className={cx('footer')} onClick={() => handleMoveIconClick()}>
                        <div className={cx('author')}>
                            <p className={cx('name')}>{currentQuote.quoteAuthor}</p>
                            <p className={cx('major')}>business</p>
                        </div>
                        <icon className={cx('nextIcon')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="38"
                                height="38"
                                viewBox="0 0 38 38"
                                fill="none"
                            >
                                <g clip-path="url(#clip0_1_42)">
                                    <path
                                        d="M25.3492 17.4167H6.33334V20.5833H25.3492V25.3333L31.6667 19L25.3492 12.6667V17.4167Z"
                                        fill="#F2F2F2"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_42">
                                        <rect width="38" height="38" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </icon>
                    </div>
                </div>
            )}

            {isNextIcon && authorQuotes?.length > 0 && (
                <div className={cx('authorQuotesContainer')}>
                    <div className={cx('authorBack')}>
                        <img
                            className={cx('backIcon')}
                            src="https://cdn.icon-icons.com/icons2/1709/PNG/512/back_112351.png"
                            alt="back icon"
                            onClick={() => handleMoveIconClick()}
                        />
                        <p className={cx('name')}>{currentQuote.quoteAuthor}</p>
                    </div>
                    {authorQuotes.map((quote) => (
                        <div className={cx('quoteContent')} key={quote._id}>
                            <p>{quote.quoteText}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default QuoteGeneratorApp;
