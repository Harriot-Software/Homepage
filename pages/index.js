/**************************************************************************************************
 *                                                                                                *
 *                       This file is subject to the terms and conditions                         *
 *                       defined in file 'LICENSE.txt', which is located                          *
 *                       in the source code package of this file.                                 *
 *                                                                                                *
 *                       Copyright (c) 2020 Harriot Software.                                     *
 *                                                                                                *
 **************************************************************************************************/

const React = require('react');

import Head from "next/head";

import Navigation from '../_components/navigation';

const NavigationHandler = require('../public/_js/navigation').NavigationHandler;

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {

        /**
         * Start navigationHandler
         */
        new NavigationHandler().Init();

    }

    render() {
        return (
            <div>
                <Head>
                    <title>Harriot - Home</title>

                    <meta name="description" content=
                        "High quality, custom software development. We offer website design and development
                        along with other software solutions."
                    />

                    <meta name="keywords" content=
                        "Harriot Software, web, wed design, web development, software development, bots, scraping"
                    />

                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                    <link rel="canonical" href="https://harriot.fi" />

                    <meta name="robots" content="all"/>

                    <link rel="apple-touch-icon" sizes="180x180" href="_favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="_favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="_favicon/favicon-16x16.png" />
                    <link rel="manifest" href="_favicon/site.webmanifest" />
                    <link rel="mask-icon" href="_favicon/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />

                    <link rel="stylesheet" href="_styles/common.css" />
                    <link rel="stylesheet" href="_styles/navigation.css" />
                    <link rel="stylesheet" href="_styles/index.css" />

                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                          crossOrigin="anonymous" />
                </Head>

                <Navigation />

                <div className="page">
                    <div className="page__container">
                        <h1 className="page__container__title desktop">
                            <img src="_img/Harriot_logo_large.png"
                                 alt="Harriot page title"
                                 className="page__container__title__image desktop"/>
                        </h1>
                        <div className="page__container__links">
                            <a href="./projects"
                               className="page__container__links__link hvr-grow-rotate"
                               title="Projects page link"
                               target="_self">
                                View our projects
                            </a>
                            <a href="./contact"
                               className="page__container__links__link hvr-grow-rotate"
                               title="Contact page link"
                               target="_self">
                                Contact us today
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;