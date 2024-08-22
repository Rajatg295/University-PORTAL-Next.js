import { useEffect, useState } from "react";
import FooterPart from "./FooterPart";
import HeaderPart from "./HeaderPart";
import LeftDrawer from "./LeftDrawer";
import axios from "@/serviceCall/axios";
import { CurrentPageTitle, isWebView } from "@/lib/Helpers";

const Webportal = (props: any) => {
  const [done, setIsDone] = useState(false);
  const [userMenus, setUserMenus] = useState<any[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setIsDone(true);
  }, []);

  useEffect(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    axios.get("home/UniHome/GetMenu").then((resp: any) => {
      if (resp.data.statusCode === 200) {
        setUserMenus(resp.data.data);
      } else {
        setUserMenus(resp.data.data);
      }
    });
  }, []);

  if (!done) return <h2>Loading UI...</h2>;

  return (
    <div id="layout-wrapper">
      {isWebView() === false && (
        <>
          <HeaderPart setShow={setShow} show={show} />
          <LeftDrawer UsersMenu={userMenus} show={show} />
        </>
      )}

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {isWebView() == false && (
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">
                      {CurrentPageTitle()}
                    </h4>

                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">
                            {CurrentPageTitle()}
                          </a>
                        </li>
                        <li className="breadcrumb-item active">
                          {CurrentPageTitle()}
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="card card-body min-vh-100  h-auto overflow-auto ">
              {props.children}
            </div>
          </div>
        </div>
        {!isWebView() && <FooterPart />}
      </div>
    </div>
  );
};

export default Webportal;
