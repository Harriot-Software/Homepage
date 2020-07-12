import React from 'react';

import Head from 'next/head';

import Navigation from '../_components/navigation';

const PageHandler = require('../public/_js/about').PageHandler;
const NavigationHandler = require('../public/_js/navigation').NavigationHandler;


class About extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    };

    /* When component mounts, initialize page handler */
    componentDidMount() {

        /**
         * Start pageHandler
         */
        new PageHandler().Init();

        /**
         * Start navigationHandler
         */
        new NavigationHandler().Init();

    }

    render() {
        return (
            <div>
                <Head>
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                    <title>Harriot - About us</title>

                    <meta name="description" content="Everything about Harriot as a company." />

                    <meta name="keywords" content="wed design, web development, software development, bots, scraping" />
                    <meta name="robots" content="all" />

                    <link rel="apple-touch-icon" sizes="180x180" href="_favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="_favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="_favicon/favicon-16x16.png" />
                    <link rel="manifest" href="_favicon/site.webmanifest" />
                    <link rel="mask-icon" href="_favicon/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />

                    <link rel="canonical" href="https://harriot.fi/about" />

                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <link rel="stylesheet" href="_styles/navigation.css" />
                    <link rel="stylesheet" href="_styles/common.css" />
                    <link rel="stylesheet" href="_styles/about.css" />
                    <link rel="stylesheet"
                          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                          crossOrigin="anonymous" />
                </Head>

                <Navigation />

                <div className="page">

                    <h1 className="page__title">
                        <img src="_img/Page_titles_about.png" alt="ABOUT US"/>
                    </h1>

                    <span className="page__next-link" id={'next-link'}>
                        <i className="far fa-arrow-alt-circle-down fa-6x"/>
                    </span>

                </div>

                <div className="page extender">

                    <div className="container">

                        <div className="section">

                            <a id="section_scroll_anchor"/>

                            <h2 className="section__title" id="hidden-section">
                                <span>
                                    <span>Who</span> are we?
                                </span>
                            </h2>

                            <div className="section__content">
                                <p>
                                    <span>Harriot Software</span> is a software development company based in Finland.
                                    We specialize in high quality custom websites.
                                </p>
                                <p>
                                    Our <span>goal</span> is to create a strong online presence for <span>your company</span>.
                                    We'll work together with <span>you</span> to create exactly what your company needs.
                                </p>
                            </div>

                        </div>

                        <div className="section">

                            <h3 className="section__title">
                                <span>
                                    <span>What</span> do we offer?
                                </span>
                            </h3>

                            <div className="section__content">

                                <p>Harriot offers you:</p>

                                <ul className="section__content__list fa-ul">
                                    <li>
                                        <span className="fa-li">
                                            <i className="fas fa-angle-right fa-lg"/>
                                        </span>
                                        Website design, development, deployment & maintenance
                                    </li>
                                    <li>
                                        <span className="fa-li">
                                            <i className="fas fa-angle-right fa-lg"/>
                                        </span>
                                        Back-end software development
                                    </li>
                                    <li>
                                        <span className="fa-li">
                                            <i className="fas fa-angle-right fa-lg"/>
                                        </span>
                                        Website scraping software development
                                    </li>
                                    <li>
                                        <span className="fa-li">
                                            <i className="fas fa-angle-right fa-lg"/>
                                        </span>
                                        Bot software development
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;