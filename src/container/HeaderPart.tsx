import Link from "next/link";
import { logOut } from "./../store/appSlice";
import { useDispatch } from "react-redux";
import { Login_UserName } from "@/lib/Helpers";
import { useEffect, useState } from "react";
import ChangePassword from "@/pages/Auth/ChangePassword";
import { MPSModel } from "@/MPSComponents/MPSModel/MPSModel";

const HeaderPart = ({ setShow, show }) => {
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [loginUserName, setLoginUserName] = useState("");

  useEffect(() => {
    setLoginUserName(Login_UserName().toString());
  }, []);

  const dispatch = useDispatch();
  return (
    <header id="page-topbar">
      <MPSModel
        modelHeader="Change Password"
        show={showChangePassword}
        onHide={() => {
          setShowChangePassword(false);
        }}
        size="lg"
        centered>
        <ChangePassword
          Reset={() => {
            setShowChangePassword(false);
            dispatch(logOut());
            window.location.replace("/Auth/Login");
          }}
        />
      </MPSModel>
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <a href="/Home/HomePage" className="logo logo-dark">
              <span className="logo-sm">
                <img src="/assets/images/GGI.png" alt="" height="44" />
              </span>
              <span className="logo-lg">
                <img src="/assets/images/GGI.png" alt="" height="44" />{" "}
                <span className="logo-txt">GGI,Amritsar</span>
              </span>
            </a>

            <a href="/Home/HomePage" className="logo logo-light">
              <span className="logo-sm">
                <img src="/assets/images/GGI.png" alt="" height="44" />
              </span>
              <span className="logo-lg">
                <img src="/assets/images/GGI.png" alt="" height="44" />{" "}
                <span className="logo-txt">GGI,Amritsar</span>
              </span>
            </a>
          </div>

          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 header-item"
            id="vertical-menu-btn"
            style={{ zIndex: 5000 }}
            onClick={() => {
              setShow(!show);
            }}>
            <i className="fa fa-fw fa-bars"></i>
          </button>

          <form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <button className="btn btn-primary" type="button">
                <i className="bx bx-search-alt align-middle"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="d-flex">
          <div className="dropdown d-inline-block d-lg-none ms-2">
            <button
              type="button"
              className="btn header-item"
              id="page-header-search-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <i data-feather="search" className="icon-lg"></i>
            </button>
            <div
              className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-search-dropdown">
              <form className="p-3">
                <div className="form-group m-0">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search ..."
                      aria-label="Search Result"
                    />

                    <button className="btn btn-primary" type="submit">
                      <i className="mdi mdi-magnify"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="dropdown d-inline-block">
            <button
              type="button"
              className="btn header-item bg-soft-light border-start border-end"
              id="page-header-user-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <img
                className="rounded-circle header-profile-user"
                src="/assets/images/profile.png"
                alt="Header Avatar"
              />
              <span className="d-none d-xl-inline-block ms-1 fw-medium">
                {/* {Login_UserName() && Login_UserName().toString()} */}
                {loginUserName}
              </span>
              <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end">
              <Link
                className="dropdown-item"
                href="#"
                onClick={() => {
                  setShowChangePassword(true);
                }}>
                <i className="bi bi-key-fill font-size-18 align-middle me-1"></i>
                Change Password
              </Link>
              <Link
                className="dropdown-item"
                href="/Auth/Login"
                onClick={() => {
                  dispatch(logOut());
                }}>
                <i className="mdi mdi-logout font-size-16 align-middle me-1"></i>{" "}
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPart;
