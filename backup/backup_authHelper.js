import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from './Utils';
import { UserRole } from '../constants/defaultValues';
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { config as AWSConfig } from 'aws-sdk';
import appConfig from '../constants/app-config.json';
import { useCookies } from 'react-cookie';

AWSConfig.region = appConfig.region;

let _url = window.location.hash;

let _currentUser = {
  id: '',
  username: '',
  title: 'Cognito',
  role: UserRole.Admin,
  name: '',
  email: ''
};

// Creates a CognitoAuth instance
const createCognitoAuth = () => {
  const appWebDomain = appConfig.userPoolBaseUri
    .replace('https://', '')
    .replace('http://', '');
  const auth = new CognitoAuth({
    UserPoolId: appConfig.userPool,
    ClientId: appConfig.clientId,
    AppWebDomain: appWebDomain,
    TokenScopesArray: appConfig.tokenScopes,
    RedirectUriSignIn: appConfig.callbackUri,
    RedirectUriSignOut: appConfig.signoutUri,
  });
  return auth;
};

// Creates a CognitoUser instance
const createCognitoUser = () => {
  const pool = createCognitoUserPool();
  return pool.getCurrentUser();
};

// Creates a CognitoUserPool instance
const createCognitoUserPool = () =>
  new CognitoUserPool({
    UserPoolId: appConfig.userPool,
    ClientId: appConfig.clientId,
  });

const parseCognitoWebResponse = (href) => {
  return new Promise((resolve, reject) => {
    const auth = createCognitoAuth();

    // userHandler will trigger the promise
    auth.userhandler = {
      onSuccess: function (result) {
        console.log(
          'parseCognitoWebResponse.userhandler.onSuccess: ' +
            JSON.stringify(result)
        );
        resolve(result);
      },
      onFailure: function (err) {
        console.log('parseCognitoWebResponse.userhandler.onFailure: ' + err);
        return;
      },
    };
    auth.parseCognitoWebResponse(href);
  });
};

// Get the URI of the hosted sign in screen
export const getCognitoSignInUri = () => {
  const signinUri = `${appConfig.userPoolBaseUri}/login?response_type=token&client_id=${appConfig.clientId}&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${appConfig.callbackUri}`;
  // const signinUri = `${appConfig.userPoolBaseUri}/login?response_type=token&client_id=${appConfig.clientId}&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3001/`;
  return signinUri;
};

// Gets a new Cognito session. Returns a promise.
const storeSession = (data, cookie, setCookie) => {
  _currentUser.id = data.idToken.payload['cognito:username'];
  _currentUser.username = data.idToken.payload['cognito:username'];
  _currentUser.name = data.idToken.payload['cognito:username'];
  _currentUser.title = data.idToken.payload['cognito:username'];
  _currentUser.email = data.idToken.payload['email'];
  _currentUser.role = data.idToken.payload['custom:adminRole']? data.idToken.payload['custom:adminRole']:UserRole.Admin;
  console.log('current user: ' + _currentUser.id);
  console.log('current user role: ' + _currentUser.role);
  localStorage.setItem(appConfig.storage_user_key, JSON.stringify(_currentUser));
  setCookie('authorization', data.idToken.jwtToken, { path: '/' });
  /// this.setState({ isAuthenticated: true });
};

const getCognitoSession = (cookie, setCookie) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = createCognitoUser();
    cognitoUser.getSession((err, result) => {
      if (err || !result) {
        console.log('Error');
        return;
      }

      console.log(
        'Successfully got session: ' + JSON.stringify(result)
      );
      const session = {
        credentials: {
          accessToken: result.accessToken.jwtToken,
          idToken: result.idToken.jwtToken,
          refreshToken: result.refreshToken.token,
        },
        user: {
          userName: result.idToken.payload['cognito:username'],
          email: result.idToken.payload.email,
        },
      };
      console.log('name: ' + result.idToken.payload.name);
      console.log('email: ' + result.idToken.payload.email);
      console.log(
        'username: ' + result.idToken.payload['cognito:username']
      );
      storeSession(result, cookie, setCookie);
      
      resolve(session);
    });
  });
};

const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const [cookies, setCookie] = useCookies(['authorization']);
  const setComponent = (props) => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        if (roles) {
          if (roles.includes(currentUser.role)) {
            return <Component {...props} />;
          }
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      } else if (_url && _url.toString() !== '') {
        parseCognitoWebResponse(_url).then(() => {
          console.log('Get cognito session1');
          getCognitoSession(cookies, setCookie).then((session) => {
            console.log('Output get session data1');
            console.log(JSON.stringify(session));
            window.location.reload();
          });
        });
      } else {
        return (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location },
            }}
          />
        );
      }
  };

  return <Route {...rest} render={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
