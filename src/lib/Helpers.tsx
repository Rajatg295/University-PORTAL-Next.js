import axios from "@/serviceCall/axios";
import { store } from "./../store/store";

export const access_token = () => {
  const state = store.getState();
  return state.appState.access_token;
};

export const Login_UserName = () => {
  const state: any = store.getState();
  return state.appState.userData.UserName
    ? state.appState.userData.UserName
    : "";
};

export const isWebView = () => {
  const state: any = store.getState();
  return state.appState.isWebView ? state.appState.isWebView : false;
};

export const GetIPAddress = async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
};

export const CurrentPageTitle = () => {
  const state = store.getState();
  return state.appState.currentPageTitle;
};

export const CheckValidAccess = async (menuId: number) => {
  const myReduxState = store.getState();
  if (
    myReduxState.appState.isAuthenticated === false ||
    myReduxState.appState.access_token === null ||
    myReduxState.appState.access_token === ""
  ) {
    window.location.replace("/Auth/Login");
  } else {
    if (menuId !== 1000) {
      await axios
        .get(`/Home/CheckUserMenuAccess?MenuId=${menuId}`)
        .then((resp) => {
          //////console.log(resp);
          if (resp.data.data !== "ok") {
            window.location.replace("/ErrorPages/NotFound");
          }
        });
    }
  }
};

export const UserId = () => {
  const state: any = store.getState();
  return state.appState.userData.UserId ? state.appState.userData.UserId : "";
};

// export const CurreantUser = () => {

//   const state: any = store.getState();
//   var user = new CurreantUser2();
//   //////console.log(state.auth.userData);

//   user.username = state.auth.userData.username;
//   user.emailId = state.auth.userData.emailId;
//   user.userId = state.auth.userData.userId;
//   user.tokenId = state.auth.userData.tokenId;
//   user.isElenMusk=state.auth.isElenMusk;
//   return user;
// }

//  class CurreantUser2 {
//   public username: string="";
//   public emailId: string="";
//   public userId: string="";
//   public tokenId: string="";
//   public isElenMusk: boolean=false;

// }

// export const isAuthenticated = () => {
//   const state = store.getState();
//   return state.auth.isAuthenticated;
// };

// export const MenuCode = (MenuId: any) => {
//   var isAuth = false;
// //////console.log(access_token())

//   if (!isAuthenticated()) {
//     isAuth = false;
//   } else if (MenuId === 0) {
//     isAuth = true;
//   } else {
//     isAuth = false;
//   }
//   if (isAuth) {
//     return true;
//   } else {
//     return (window.location.href = "/ErrorPages/404");
//   }
// };
