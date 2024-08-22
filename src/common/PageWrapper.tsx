import axios from "@/serviceCall/axios";
import { chagePageTitle } from "@/store/appSlice";
import { store } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PageWrapper = (WrappedComponent, menuId) => {
  const WithAccessControl = ({ ...props }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isAllowed, setIsAllowed] = useState<any>(false);
    useEffect(() => {
      const CheckValidAccess = async (menuId: number) => {
        const myReduxState = store.getState();
        if (
          myReduxState.appState.isAuthenticated === false ||
          myReduxState.appState.access_token === null ||
          myReduxState.appState.access_token === ""
        ) {
          // window.location.replace("/Auth/Login");
          router.replace("/Auth/Login");
          dispatch(chagePageTitle("MPS"));
        } else {
          if (menuId !== 1000) {
            await axios
              .get(`/home/UniHome/CheckMenuAccess?MenuId=${menuId}`)
              .then((resp) => {
                if (resp.data.data === true) {
                  setIsAllowed(true);
                } else {
                  dispatch(chagePageTitle("Not found"));
                  // window.location.replace("/ErrorPages/NotFound");
                  router.replace("/ErrorPages/NotFound");
                }
              });
          } else {
            setIsAllowed(true);
          }
        }
      };
      CheckValidAccess(menuId);
    }, []);
    if (isAllowed === false) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };

  return WithAccessControl;
};

export default PageWrapper;
