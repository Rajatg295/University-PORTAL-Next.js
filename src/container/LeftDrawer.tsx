import Link from "next/link";
import { useDispatch } from "react-redux";
import { chagePageTitle } from "../store/appSlice";
import { useState } from "react";

const LeftDrawer = (props) => {
  const dispatch = useDispatch();
  const [ptName, setPtName] = useState<string>("");
  const [isCollapse, setIsCollapse] = useState<boolean>(true);

  async function onCollapse(data: any) {
    setPtName("");
    if (data === ptName) {
      setIsCollapse(false);
    } else {
      setPtName(data);
      setIsCollapse(true);
    }
  }

  return (
    <div className={`vertical-menu ${props.show === true ? " active" : ""}`}>
      <div data-simplebar className="h-100">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title" data-key="t-menu">
              Menu
            </li>

            <li>
              <Link
                href="/Webportal/Home/HomePage"
                onClick={() => dispatch(chagePageTitle("Home"))}>
                <i className="bi bi-house-door"></i>
                <span data-key="t-dashboard">Home</span>
              </Link>
            </li>

            {props.UsersMenu &&
              props.UsersMenu.filter((val) => val.parentId === 0).map(
                (menu, index) => {
                  //console.log(menu, "menu");
                  return (
                    <li key={menu.menuId}>
                      <a
                        href="javascript: void(0);"
                        className="has-arrow"
                        onClick={() => onCollapse(menu.name)}>
                        <i className={`fas ${menu.iconURL}`}></i>
                        <span data-key={menu.menuId}>{menu.name}</span>
                      </a>
                      <ul
                        className={`drawer-nav ${
                          ptName === menu.name && isCollapse ? "" : "collapse"
                        }`}
                        aria-expanded={false}>
                        {props.UsersMenu.filter(
                          (val) => val.parentId === menu.menuId
                        ).map((mySub, indexSub) => {
                          return (
                            <li className="drawer-item">
                              <Link
                                onClick={() =>
                                  dispatch(chagePageTitle(mySub.name))
                                }
                                href={mySub.navigationURL}
                                data-key={menu.menuId}>
                                {mySub.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftDrawer;
