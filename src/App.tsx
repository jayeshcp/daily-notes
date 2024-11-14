import React from "react";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
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
import { updateWorkspace } from "./actions";

type AppProps = {
  currentState: any,
  intl: any,
  updateWorkspace: (any) => void
};

function App(props: AppProps) {
  const title = `${config.appName} - v${config.appVersion}`;
  const { currentState: { currentWorkspace }, updateWorkspace } = props;

  const Root = () => <Redirect to="/home" />;

  const handleWorkspaceChange = (event) => {
    updateWorkspace(event.target.value);
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Daily notes on steroid!" />
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
                    value={currentWorkspace}
                    onChange={event => handleWorkspaceChange(event)}
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

const mapStateToProps = (state) => {
  return {
    currentState: state.notes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateWorkspace: (workspace) => dispatch(updateWorkspace(workspace))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(App));