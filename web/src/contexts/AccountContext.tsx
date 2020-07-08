import React, { useEffect, useReducer } from "react";

type AccountContextProps = {
  children: React.ReactNode;
};

type AccountContextState = {
  token: string | null;
  loading: boolean;
};

interface AccountContextProvider extends AccountContextState {
  setAccount: (token: string) => void;
}

type AccountContextAction = {
  type: "SET_ACCOUNT";
  token: string | null;
};

export const AccountContext = React.createContext<AccountContextProvider>({
  token: null,
  loading: true,
  setAccount: () => {},
});

function reducer(
  state: AccountContextState,
  action: AccountContextAction
): AccountContextState {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        token: action.token,
        loading: false,
      };
    default:
      return state;
  }
}

function AccountProvider({ children }: AccountContextProps) {
  const [state, dispatch] = useReducer(reducer, {
    token: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || null;

    if (token) {
      dispatch({
        type: "SET_ACCOUNT",
        token,
      });
    } else {
      dispatch({
        type: "SET_ACCOUNT",
        token: null,
      });
    }
  }, []);

  function setAccount(token: string): void {
    localStorage.setItem("token", token);

    dispatch({
      type: "SET_ACCOUNT",
      token,
    });
  }

  return (
    <AccountContext.Provider value={{ ...state, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export default AccountProvider;
