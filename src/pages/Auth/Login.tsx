import { useForm } from "react-hook-form";
import MPSInputText from "./../../../src/MPSComponents/Inputs/MPSInputText";
import { useState } from "react";
import axios from "./../../serviceCall/axios";
import Swal from "sweetalert2";
import { chagePageTitle, login } from "../../store/appSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { GetIPAddress } from "@/lib/Helpers";
import { Spinner } from "react-bootstrap";
import Image from "next/image";

interface LoginFiels {
  UserName: string;
  Password: string;
}

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    formState: { errors },
  } = useForm<LoginFiels>();

  const onSubmit = (data: LoginFiels) => {
    try {
      setIsLoading(true);
      axios
        .get(
          `/Authentication/EduValidation?UserId=${encodeURIComponent(
            data.UserName
          )}&Password=${encodeURIComponent(
            data.Password
          )}&IPAddress=${GetIPAddress()}&Source=unisocWeb`
        )
        .then((resp) => {
          if (resp.data.response.statusCode === 200) {
            dispatch(
              login({
                token: resp.data.jsonToken,
                isWebView: false,
                userData: {
                  UserName: resp.data.response.data[0].name,
                  UserId: resp.data.response.data[0].userId,
                },
              })
            );
            dispatch(chagePageTitle("Home"));
            router.replace("/Webportal/Home/HomePage");
            setIsLoading(false);
          } else {
            setIsLoading(false);
            Swal.fire({
              title: "Invalid Username or Password",
              icon: "error",
            });
            setFocus("Password");
          }
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-xxl-3 col-lg-4 col-md-5">
            <div className="auth-full-page-content d-flex p-sm-5 p-4">
              <div className="w-100">
                <div className="d-flex flex-column h-100">
                  <div className="mb-2  text-center">
                    <a href="#" className="d-block auth-logo">
                      <Image
                        src="/assets/images/Metaponder2.png"
                        alt=""
                        height="130"
                        width={"320"}
                      />{" "}
                      {/* <span className="logo-txt">Minia</span> */}
                    </a>
                  </div>
                  <div className="auth-content my-auto">
                    <div className="text-center mb-3">
                      <h5 className="mb-0">Welcome to Metaponder Solutions</h5>
                    </div>

                    <div className="mb-3 mt-2">
                      <label className="form-label">Username</label>
                      <MPSInputText
                        register={{
                          ...register("UserName", {
                            required: true,
                            validate: (value) => {
                              return !!value.trim();
                            },
                          }),
                        }}
                        errors={errors}
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <label className="form-label">Password</label>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="">
                            <a
                              href="/Auth/ForgotPassword?urlCode=6esixqql4cr3yq7eGd1ZzzQVX"
                              tabIndex={-1}
                              className="text-muted">
                              Forgot password?
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="input-group auth-pass-inputgroup">
                        <MPSInputText
                          register={{
                            ...register("Password", {
                              required: true,
                              validate: (value) => {
                                return !!value.trim();
                              },
                            }),
                          }}
                          type={showPassword ? "text" : "password"}
                          errors={errors}
                          placeholder="Enter password"
                        />

                        <button
                          className="btn btn-light shadow-none ms-0"
                          type="button"
                          id="password-addon"
                          tabIndex={-1}>
                          <i
                            className={
                              showPassword
                                ? "mdi mdi-eye-off-outline"
                                : "mdi mdi-eye-outline"
                            }
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}></i>
                        </button>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember-check"
                            tabIndex={-1}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="remember-check">
                            Remember me
                          </label>
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <div className="mb-3">
                      {isLoading ? (
                        <Spinner animation="border" variant="primary" />
                      ) : (
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                          onClick={handleSubmit(onSubmit)}>
                          Log In
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-9 col-lg-8 col-md-7">
            <div className="auth-bg pt-md-5 p-4 d-flex">
              <div className="bg-overlay bg-primary"></div>
              <ul className="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>

              <div className="row justify-content-center align-items-center">
                <div className="col-xl-7">
                  <div className="p-0 p-sm-4 px-xl-0">
                    <div
                      id="reviewcarouselIndicators"
                      className="carousel slide"
                      data-bs-ride="carousel">
                      <div className="carousel-indicators carousel-indicators-rounded justify-content-start ms-0 mb-0">
                        <button
                          type="button"
                          data-bs-target="#reviewcarouselIndicators"
                          data-bs-slide-to="0"
                          className="active"
                          aria-current="true"
                          aria-label="Slide 1"></button>
                        <button
                          type="button"
                          data-bs-target="#reviewcarouselIndicators"
                          data-bs-slide-to="1"
                          aria-label="Slide 2"></button>
                        <button
                          type="button"
                          data-bs-target="#reviewcarouselIndicators"
                          data-bs-slide-to="2"
                          aria-label="Slide 3"></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
