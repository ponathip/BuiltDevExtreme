import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import 'devextreme/dist/css/dx.common.css';
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import appInfo from './app-info';
import { navigation } from './app-navigation';
import routes from './app-routes';
import './App.scss';
import './dx-styles.scss';
import { Footer, LoginForm } from './components';
import {
  SideNavOuterToolbar as SideNavBarLayout,
  SingleCard
} from './layouts';
import { sizes, subscribe, unsubscribe } from './utils/media-query';

const LoginContainer = ({ logIn }) => <LoginForm onLoginClick= {logIn}  />;

const NotAuthPage = (props) => (
  <SingleCard>
    <Route render={() => <LoginContainer {...props} />} />
  </SingleCard>
);

const AuthPage = (props) => (
<SideNavBarLayout menuItems={navigation} title={appInfo.title} login={props.username} {...props} >
    {/* ส่วนนี้เรียก from มาใส่ app,js */}
    <Switch>
      {routes.map(item => (
        <Route
          exact
          key={item.path}
          path={item.path}
          component={item.component}
        />
      ))}
      <Redirect to={'/home'} />
    </Switch>
    {/* ส่วนนี้เรียก from มาใส่ app,js */}

    <Footer>
      Copyright © 2011-2019 Developer Express Inc.
      <br />
      All trademarks or registered trademarks are property of their
      respective owners.
    </Footer>
  </SideNavBarLayout>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,     
      screenSizeClass: this.getScreenSizeClass()
    };
    
    this.userMenuItems = [
      // {
      //   text: 'Profile',
      //   icon: 'user'
      // },
      {
        text: 'Logout',
        icon: 'runner',
        onClick: this.logOut
      }
    ];
  }

  componentDidMount() {
    subscribe(this.screenSizeChanged);
  }

  componentWillUnmount() {
    unsubscribe(this.screenSizeChanged);
  }

  render() {
    const { loggedIn , username} = this.state;
    return (
      <div className={`app ${this.state.screenSizeClass}`}>
        <Router>{loggedIn ? <AuthPage userMenuItems={this.userMenuItems} username={username}  /> : <NotAuthPage logIn={this.logIn} />}</Router>
      </div>
    );
  }

  getScreenSizeClass() {
    const screenSizes = sizes();
    return Object.keys(screenSizes).filter(cl => screenSizes[cl]).join(' ');
  }

  screenSizeChanged = () => {
    this.setState({
      screenSizeClass: this.getScreenSizeClass()
    });
  }

  logIn = (username) => {
    this.setState({ loggedIn: true , username:username});
  };

  logOut = () => {
    this.setState({ loggedIn: false });
  };
}

export default App;
