const React = require('react');

export default function Navigation() {
    return (
        <nav className="navigation">
            <div className="navigation__links-left">
                <a className="navigation__brand active"
                   title="Home page link"
                   href=""
                   target="_self">
                    <img className="navigation__brand__title" src="_img/Harriot_logo_small.png" alt="HOME" />
                </a>
            </div>
            <div className="navigation__floater">
                <div className="navigation__floater__links-container" id="hidden-links-container">
                    <div className="navigation__floater__links-container__cover">
                        Menu
                    </div>
                    <ul>
                        <li>
                            <a className="navigation__floater__links-container__link primary"
                               title="Home page link"
                               href=""
                               target="_self">
                                Home<i className="fa fa-home" />
                            </a>
                        </li>
                        <li>
                            <a className="navigation__floater__links-container__link"
                               title="Projects page link"
                               href="./projects"
                               target="_self">
                                Projects<i className="far fa-folder-open" />
                            </a>
                        </li>
                        <li>
                            <a className="navigation__floater__links-container__link"
                               title="Contact us page link"
                               href="./contact"
                               target="_self">
                                Contact us<i className="far fa-envelope" />
                            </a>
                        </li>
                        <li>
                            <a className="navigation__floater__links-container__link"
                               title="About us page link"
                               href="./about"
                               target="_self">
                                About us<i className="far fa-address-card" />
                            </a>
                        </li>
                        <li>
                            <a className="navigation__floater__links-container__link"
                               title="GitHub external link"
                               href="https://github.com/harriot-software"
                               target="_blank">
                                GitHub <i className="fab fa-github" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}