import { useEffect } from "react";
import Webportal from "../../../container/Webportal";
import PageWrapper from "@/common/PageWrapper";
import { chagePageTitle } from "@/store/appSlice";
import { useDispatch } from "react-redux";

const HomePage = () => {
  return (
    <Webportal>
      <h2>Welcome to Home</h2>
    </Webportal>
  );
};

export default PageWrapper(HomePage, 1000);
