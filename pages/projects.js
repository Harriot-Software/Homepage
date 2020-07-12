const React = require('react');

import Head from "next/head";

import Navigation from '../_components/navigation';

const PageHandler = require('../public/_js/projects').PageHandler;
const NavigationHandler = require('../public/_js/navigation').NavigationHandler;

class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

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
                    <title>Harriot - Projects</title>

                    <meta name="description" content="Showcasing of Harriot's projects." />

                    <meta name="keywords" content="Harriot Software, web development, software development, projects" />

                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                    <link rel="canonical" href="https://harriot.fi/projects" />

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
                    <link rel="stylesheet" href="_styles/projects.css" />

                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                          crossOrigin="anonymous" />
                </Head>

                <Navigation />

                <div className="page">

                    <h1 className="page__title">
                        <img src="_img/Page_titles_projects.png" alt="Our projects" />
                    </h1>

                    <div className="page__projects-container">

                        <div className="page__projects-container__projects">

                            <div className="project">

                                <div className="project__image-container">
                                    <h2>
                                        <a className="project__image-container__title"
                                           title="Link to CacheMaps.net"
                                           href="https://CacheMaps.net"
                                           target="_blank">
                                            <img className="cachemaps"
                                                 src="_img/Projects_cachemaps_title.png"
                                                 alt="CACHEMAPS.NET" />
                                        </a>
                                    </h2>
                                    <div className="project__image-container__image">
                                        <a href="https://CacheMaps.net"
                                           title="Link to CacheMaps.net"
                                           target="_blank">
                                            <img src="_img/projects_cachemapsnet.png" alt="CacheMaps.net" />
                                        </a>
                                    </div>
                                </div>

                                <div className="project__details">

                                    <div className="project__details__toggle" id="cachemaps">
                                        <span>More information</span> <i className="fas fa-chevron-right fa-3x icon" />
                                    </div>

                                    <div className="project__details__container">
                                        <div className="project__details__container__content">
                                            <div className="project__details__container__content__technologies">
                                                <div className="project__details__container__content__technologies__title">
                                                    <h3>
                                                        <span>Technologies</span> <span>used:</span>
                                                    </h3>
                                                </div>

                                                <div className="project__details__container__content__technologies__content">
                                                <span className="javascript">
                                                    Javascript
                                                </span>
                                                    <span className="php">
                                                    php
                                                </span>
                                                    <span className="mysql">
                                                    MySQL
                                                </span>
                                                    <span className="d3js">
                                                    D3.js
                                                </span>
                                                    <span className="jquery">
                                                    jQuery
                                                </span>
                                                </div>
                                            </div>

                                            <div className="project__details__container__content__description">
                                                <p>
                                                    <a href="https://cachemaps.net/" target="_blank">
                                                        www.<span>cachemaps</span>.net
                                                    </a>
                                                    was created to allow geocachers to create visual
                                                    statistical maps according to their geocaching finds. For example, users
                                                    are able to create maps of their FTF, or First To Find, -finds which
                                                    some users keep track of.
                                                </p>
                                                <p>
                                                    Users quickly realized the website's potential in tracking
                                                    non-geocaching related statistics as well. The website can be used
                                                    to track just about anything on a municipality level.
                                                </p>
                                                <p>
                                                    The website started off as a
                                                    basic <span>HTML</span> / <span>Javascript </span>
                                                    based website. Later, <span>PHP</span> was introduced to the project
                                                    which allowed for more complex features, such as user accounts, profiles
                                                    and much more.
                                                </p>
                                                <p>
                                                    The website is styled entirely without any CSS frameworks.
                                                    Everything is completely hand-written from scratch.
                                                </p>
                                                <p>
                                                    Photographs present on CacheMaps.net is photographed by us.
                                                </p>
                                                <p>
                                                    Maps are stored in .csv -file format and are rendered with the use
                                                    of the <span>D3.js</span> -Javascript library. Additional information is
                                                    also
                                                    rendered alongside the maps with Javascript.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="project">

                                <div className="project__image-container">
                                    <h2>
                                        <a className="project__image-container__title"
                                           title="Link to Vaasa Airsoft"
                                           href="https://www.vaasa-airsoft.com"
                                           target="_blank">
                                            <img className="VAA" src="_img/Projects_vaa_title.png" alt="Vaasa Airsoft" />
                                        </a>
                                    </h2>

                                    <div className="project__image-container__image">
                                        <a href="https://www.vaasa-airsoft.com"
                                           title="Link to Vaasa Airsoft"
                                           target="_blank">
                                            <img src="_img/projects_VAA.png" alt="Vaasa Airsoft" />
                                        </a>
                                    </div>
                                </div>

                                <div className="project__details">
                                    <div className="project__details__toggle" id="VAA">
                                        <span>More information</span> <i className="fas fa-chevron-right fa-3x icon" />
                                    </div>

                                    <div className="project__details__container">
                                        <div className="project__details__container__content">
                                            <div className="project__details__container__content__technologies">
                                                <div className="project__details__container__content__technologies__title">
                                                    <h3>
                                                        <span>Technologies</span> <span>used:</span>
                                                    </h3>
                                                </div>

                                                <div className="project__details__container__content__technologies__content">
                                                <span className="php">
                                                    php
                                                </span>
                                                    <span className="javascript">
                                                    Javascript
                                                </span>
                                                    <span className="mysql">
                                                    MySQL
                                                </span>
                                                </div>
                                            </div>

                                            <div className="project__details__container__content__description">
                                                <p>
                                                    <a href="https://cachemaps.net/" target="_blank">
                                                        www.<span>vaasa-airsoft</span>.com
                                                    </a>
                                                    is a website developed for
                                                    Vaasa Airsoft Association to let local airsoft players connect online.
                                                    The website's main features are the game calendar, forums & news
                                                    section.
                                                </p>
                                                <p>
                                                    The website was developed using <span>PHP</span> & <span>MySQL</span>
                                                    for the back-end, while <span>Javascript</span> was used for the
                                                    front-end.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hide unimportant projects temporarily

                        <div class="project">
                            <div class="project__image-container">
                                <h2>
                                    <a class="project__image-container__title"
                                       title="Link to NewsBot"
                                       href="https://discordbots.org/bot/562687174697549856"
                                       target="_blank">
                                        <img class="newsbot" src="img/SS_projects_newsbot_title.png" alt="NEWSBOT">
                                    </a>
                                </h2>
                                <div class="project__image-container__image">
                                    <a href="https://discordbots.org/bot/562687174697549856"
                                       title="Link to NewsBot"
                                       target="_blank">
                                        <img src="img/projects_newsbot.png" alt="NewsBot">
                                    </a>
                                </div>
                            </div>
                            <div class="project__details">
                                <div class="project__details__toggle" id="newsbot">
                                    <span>More information</span><i class="fas fa-chevron-right fa-3x icon"></i>
                                </div>
                                <div class="project__details__container">
                                    <div class="project__details__container__content">
                                        <div class="project__details__container__content__technologies">
                                            <div class="project__details__container__content__technologies__title">
                                                <h3>
                                                    <span>Technologies</span> <span>used:</span>
                                                </h3>
                                            </div>
                                            <div class="project__details__container__content__technologies__content">
                                                <span class="javascript">
                                                    Javascript
                                                </span>
                                                <span class="mysql">
                                                    MySQL
                                                </span>
                                                <span class="nodejs">
                                                    Node.js
                                                </span>
                                                <span class="cheeriojs">
                                                    Cheerio.js
                                                </span>
                                                <span class="node-cron">
                                                    Node-cron
                                                </span>
                                            </div>
                                        </div>
                                        <div class="project__details__container__content__description">
                                            <p>
                                                <span>NewsBot</span> is a Discord bot which crawls various game
                                                websites for update articles. Whenever a game releases a new
                                                update, NewsBot posts an article about the update to all Discord channels which are
                                                subscribed to that game's news schedule.
                                            </p>
                                            <p>
                                                Users are also able to get the latest update article for any supported game
                                                instantly with the command '!nb news &lt;game&gt;'.
                                            </p>
                                            <p>
                                                NewsBot is built entirely with the <span>Node.js</span> -Javascript library.
                                            </p>
                                            <p>
                                                Website crawling is achieved with the aid of the <span>Cheerio</span> -library
                                                while the <span>Node-cron</span> -library handles scheduling of automatic news
                                                articles.
                                            </p>
                                            <p>
                                                <span>MySQL</span> is used to store the channels subscribed to various news
                                                schedules & to keep track of previously posted update articles.
                                            </p>
                                            <p>
                                                Newsbot has a
                                                <span>
                                                    <a href="https://GitHub.com/Zecuel/NewsBot"
                                                       title="Link to NewsBot's GitHub"
                                                       target="_blank">GitHub repository</a>
                                                    <i class="fab fa-github"></i>
                                                </span>
                                                which contains all of the project's core files.
                                            </p>
                                            <p>
                                                NewsBot also has a
                                                <a href="https://discordbots.org/bot/562687174697549856"
                                                   title="Link to NewsBot discordbots.org page"
                                                   target="_blank"><span>discordbots.org</span></a> -page.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        comment end */}

                        </div>
                    </div>
                </div>

                <script type="text/javascript" src="_js/navigation.js" />
            </div>
        );
    }
}

export default Projects;