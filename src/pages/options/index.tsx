import React from 'react';
import './App.less';
import { HashRouter as Router, Switch, Link } from 'react-router-dom';
import Accounts from '../popup/accounts';
import AccountsHome from '../popup/accounts/home';
import AccountsList from '../popup/accounts/list';
import Resources from './Resources';
import Home from './Home';
import Plugins from './Plugins';
import Settings from './Settings';
import Help from './Help';
import About from './About';
import RouteWithSubRoutes, {
  IRouteProps,
} from '../components/RouteWithSubRoutes';

import '@/theme/index.less';
const routes: IRouteProps[] = [
  {
    path: '/accounts',
    component: Accounts,
    routes: [
      { path: '/accounts/home', component: AccountsHome },
      { path: '/accounts/list', component: AccountsList },
    ],
  },
  {
    path: '/plugins',
    component: Plugins,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/help',
    component: Help,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/resources',
    component: Resources,
  },
  {
    path: '*',
    component: Home,
  },
];

const App = (props: any) => {
  const { hash } = props.location;
  console.log(hash);
  return (
    <div className="root-container">
      <Router>
        <div className="options-container">
          <div className="navbar">
            <img
              className="logo"
              src={chrome.extension.getURL('images/Sodalogo.png')}
              alt=""
            />

            <ul style={{ listStyleType: 'none' }}>
              <li>
                <Link to="/">
                  <span
                    className={`link-item ${
                      hash === '#/' ? 'link-item-active' : ''
                    }`}
                  >
                    <img
                      src={
                        hash === '#/'
                          ? chrome.extension.getURL(
                              'images/icon-home-active.png',
                            )
                          : chrome.extension.getURL('images/icon-home.svg')
                      }
                      alt=""
                    />
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/accounts/home">
                  <span
                    className={`link-item ${
                      hash === '#/accounts/home' ? 'link-item-active' : ''
                    }`}
                  >
                    <img
                      src={
                        hash === '#/accounts/home'
                          ? chrome.extension.getURL(
                              'images/icon-account-active.png',
                            )
                          : chrome.extension.getURL('images/icon-account.svg')
                      }
                      alt=""
                    />
                    Account
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/plugins">
                  <span
                    className={`link-item ${
                      hash === '#/plugins' ? 'link-item-active' : ''
                    }`}
                  >
                    <img
                      src={
                        hash === '#/plugins'
                          ? chrome.extension.getURL(
                              'images/icon-plugins-active.png',
                            )
                          : chrome.extension.getURL('images/icon-chart.svg')
                      }
                      alt=""
                    />
                    Plugins
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/resources">
                  <span
                    className={`link-item ${
                      hash === '#/resources' ? 'link-item-active' : ''
                    }`}
                  >
                    <img
                      src={
                        hash === '#/resources'
                          ? chrome.extension.getURL(
                              'images/icon-discovery-active.png',
                            )
                          : chrome.extension.getURL('images/icon-discovery.svg')
                      }
                      alt=""
                    />
                    NFT Resources
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <span
                    className={`link-item ${
                      hash === '#/settings' ? 'link-item-active' : ''
                    }`}
                  >
                    <img
                      src={
                        hash === '#/settings'
                          ? chrome.extension.getURL(
                              'images/icon-setting-active.png',
                            )
                          : chrome.extension.getURL('images/icon-setting.svg')
                      }
                      alt=""
                    />
                    Settings
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/help">
                  <span
                    className={`link-item ${
                      hash === '#/help' ? 'link-item-active' : ''
                    }`}
                  >
                    <img
                      src={
                        hash === '#/help'
                          ? chrome.extension.getURL(
                              'images/icon-help-active.png',
                            )
                          : chrome.extension.getURL('images/icon-help.svg')
                      }
                      alt=""
                    />
                    Help
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <span
                    className={`link-item ${
                      hash === '#/about' ? 'link-item-active' : ''
                    }`}
                  >
                    <img
                      src={
                        hash === '#/about'
                          ? chrome.extension.getURL(
                              'images/icon-about-active.png',
                            )
                          : chrome.extension.getURL('images/icon-about.svg')
                      }
                      alt=""
                    />
                    About
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="options-content">
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
