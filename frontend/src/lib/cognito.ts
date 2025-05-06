import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  ISignUpResult
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId:   process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
};

const userPool = new CognitoUserPool(poolData);

export function signUp(username: string, password: string, email: string): Promise<ISignUpResult> {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email })
  ];

  return new Promise((res, rej) =>
    userPool.signUp(username, password, attributeList, [], (err, result) =>
      err ? rej(err) : res(result as ISignUpResult)
    )
  );
}

export function confirmSignUp(username: string, code: string): Promise<string> {
  const user = new CognitoUser({ Username: username, Pool: userPool });

  return new Promise((res, rej) =>
    user.confirmRegistration(code, true, (err, result) =>
      err ? rej(err) : res(result as string)
    )
  );
}

export function resendConfirmationCode(username: string): Promise<string> {
  const user = new CognitoUser({ Username: username, Pool: userPool });

  return new Promise((res, rej) =>
    user.resendConfirmationCode((err, result) =>
      err ? rej(err) : res(result as string)
    )
  );
}

export function signIn(username: string, password: string): Promise<CognitoUserSession> {
  const user = new CognitoUser({ Username: username, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: username, Password: password });

  return new Promise((res, rej) =>
    user.authenticateUser(authDetails, {
      onSuccess: (session: CognitoUserSession) => res(session),
      onFailure: rej
    })
  );
}

export function signOut() {
  userPool.getCurrentUser()?.signOut();
}

export function getCurrentSession(): Promise<CognitoUserSession | null> {
  const user = userPool.getCurrentUser();
  if (!user) return Promise.resolve(null);

  return new Promise((res) =>
    user.getSession((err: Error | null, session: CognitoUserSession | null) =>
      err || !session ? res(null) : res(session)
    )
  );
}
