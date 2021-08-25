import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { NavLink } from "react-router-dom";
import config from "./config";
import About from "./components/About";
import Home from "./components/Home";

type AppState = {
  workspace: string
}
class App extends Component<{}, AppState> {
  title: string;

  constructor(props: any) {
    super(props);
    this.title = `${config.appName} - v${config.appVersion}`;
    this.state = {
      workspace: 'work'
    };
  }

  render() {
    const { title, state: { workspace } } = this;

    const Root = () => <Redirect to="/home" />;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content="Todos on steroid!" />
          <html lang="en" />
        </Helmet>

        <div className="container">
          <Router>
            <div className="row">
              <div className="col-md-12">
                <div className="header">
                  Notes <small>v{config.appVersion}</small>
                </div>
                <ul className="nav pull-right">
                  <li>
                    <select
                      value={workspace}
                      onChange={(event) => this.setState({ workspace: event.target.value })}
                    >
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                    </select>
                  </li>
                  <li>
                    <NavLink
                      className="menuItem"
                      activeClassName="active"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="menuItem"
                      activeClassName="active"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                </ul>
                <div className="clear"></div>
                <div className="separator"></div>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <Switch>
                <Route exact path="/about" component={About} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/" component={Root} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default injectIntl(App);
