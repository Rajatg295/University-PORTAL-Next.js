import axios from "@/serviceCall/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios2 from "axios";
import { MPSCustomButton } from "@/MPSComponents/Buttons/MPSCustomButton";
import { MPSTextComponent } from "@/MPSComponents/Inputs/MPSInputComponent";
import MPSInputText from "@/MPSComponents/Inputs/MPSInputText";

const ForgotPassword = () => {
  const router = useRouter();
  const { urlCode } = router.query;

  if (!urlCode) {
    return <div>Page is Loading...</div>;
  }
  const [myResp, setMyResp] = useState<any>(null);
  const [isOTPSent, setIsOTPSent] = useState<boolean>(false);
  const [isOTPVerified, setIsOTPVerified] = useState<boolean>(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [textType, setTextType] = useState("password");
  const [buttonIcon, setButtonIcon] = useState("bi-eye-slash");
  const [passwordExpression, setPasswordExpression] = useState([
    {
      icon: "bi-x-circle",
      title: "At least 8 characters length",
      isVerified: false,
      regex: /.{8,}/,
    },
    {
      icon: "bi-x-circle",
      title: "At least one number (0...9)",
      isVerified: false,
      regex: /[0-9]/,
    },
    {
      icon: "bi-x-circle",
      title: "At least one lower case letter (a...z)",
      isVerified: false,
      regex: /[a-z]/,
    },
    {
      icon: "bi-x-circle",
      title: "At least one special symbol (!...$)",
      isVerified: false,
      regex: /[^A-Za-z0-9]/,
    },
    {
      icon: "bi-x-circle",
      title: "At least one upper case letter (A-Z)",
      isVerified: false,
      regex: /[A-Z]/,
    },
  ]);

  let redirectUrls = {
    "6esixqql4cr3yq7eGd1ZzzQVX": "https://ems2.deshbhagatuniversity.in",
    "89HPGm5vNdlxKuLmWysSAAuQR": "https://ems.deshbhagatuniversity.in",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  interface Inputs {
    UserId: string;
  }
  interface Inputs2 {
    OTP: string;
  }
  interface Inputs3 {
    NewPassword: string;
    ConfirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<Inputs2>({
    mode: "onChange",
  });

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    getValues: getValues3,
    formState: { errors: errors3 },
  } = useForm<Inputs3>({ mode: "onChange" });

  const RecoverPassword = async (data: Inputs) => {
    try {
      await axios
        .post(`/forgotpassword/ForgotPasswordInsert?UserId=${data.UserId}`)
        .then((resp: any) => {
          if (resp.data.statusCode === 200) {
            if (resp.data.data[0].message === "ok") {
              setMyResp(resp.data.data[0]);

              let contact = resp.data.data[0]["mobile"];
              let message = `Dear ${
                resp.data.data[0]["name"]
              } as per your request to reset your password. Your OTP is${
                " " + resp.data.data[0]["otp"]
              } and valid for${" " + "5 min"} Team Desh Bhagat University.`;
              var myEncoded = encodeURI(message);
              var template = "1707170262166180476";

              SendSMS(contact, myEncoded, template);
            } else {
              Swal.fire({
                icon: "error",
                titleText: resp.data.data[0].message,
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              titleText: resp.data.message,
            });
          }
        });
    } catch (error) {}
  };

  const SendSMS = async (contact, MessageString, templateId) => {
    try {
      const response = await fetch(
        `https://sms.k7marketinghub.com/app/smsapi/index.php?key=56364ADEFBFAEE&campaign=14838&routeid=30&type=text&contacts=${contact}&senderid=DSHBGT&msg=${MessageString}&template_id=${templateId}`
      );
    } catch (error) {
      setIsOTPSent(true);
      setMinutes(5);
      setSeconds(0);
    }
    setIsOTPSent(true);
    setMinutes(5);
    setSeconds(0);
  };

  const SubmitOTP = async (data: Inputs2) => {
    await axios
      .post(
        `/forgotpassword/ForgotPasswordVerifyOTP?UserId=${getValues(
          "UserId"
        )}&OTP=${data.OTP}`
      )
      .then((resp: any) => {
        if (resp.data.statusCode === 200) {
          if (resp.data.data[0].message === "updated") {
            setIsOTPVerified(true);
          } else {
            setIsOTPVerified(false);
            Swal.fire({
              icon: "warning",
              titleText: resp.data.data[0].message,
            });
          }
        }
      });
  };

  const resendOTP = () => {
    RecoverPassword({ UserId: getValues("UserId") });
  };

  const onChangeNewPasswordHandler = (e) => {
    const myExps = [...passwordExpression];

    for (let index = 0; index < passwordExpression.length; index++) {
      if (passwordExpression[index].regex.test(e.target.value)) {
        myExps[index].isVerified = true;
        myExps[index].icon = "bi-patch-check";
      } else {
        myExps[index].isVerified = false;
        myExps[index].icon = "bi-x-circle";
      }
    }
    setPasswordExpression(myExps);
  };

  const onChangeTextType = () => {
    errors3.NewPassword = null;
    setTextType(textType === "password" ? "text" : "password");
    setButtonIcon(textType === "password" ? "bi-eye" : "bi-eye-slash");
  };

  const SavePassword = async (data: Inputs3) => {
    let isInValid = 0;
    for (let index = 0; index < passwordExpression.length; index++) {
      if (passwordExpression[index].isVerified === false) {
        isInValid += 1;
      }
    }

    if (isInValid > 0) {
      Swal.fire({
        titleText: "Choose Strong Password",
        icon: "warning",
      });
      return;
    }
    await axios
      .post(
        `/forgotpassword/ForgotPasswordUpdate?UserId=${getValues(
          "UserId"
        )}&NewPassword=${data.NewPassword}`
      )
      .then((resp: any) => {
        if (resp.data.statusCode === 200) {
          if (resp.data.data === "updated") {
            Swal.fire({
              titleText: "Password Changed Successfully !",
              icon: "success",
            });
            router.replace(redirectUrls[urlCode.toString()]);
          } else {
            Swal.fire({
              icon: "warning",
              titleText: resp.data.data,
            });
          }
        }
      });
  };

  return (
    <>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        className="mt-2">
        <div style={{ width: "65%" }}>
          <div className="card shadow-sm">
            <h4 className="card-header">Forgot Password</h4>
            <div className="card-body">
              {isOTPSent === false && isOTPVerified === false && (
                <div>
                  <div className="row">
                    <MPSTextComponent
                      label="User ID"
                      colLg={12}
                      colMd={12}
                      colSm={12}
                      showRequiredAsterisk={true}
                      register={{
                        ...register("UserId", {
                          required: true,
                          validate: (value) => {
                            return !!value.trim();
                          },
                        }),
                      }}
                      errors={errors}
                      placeholder="Enter User ID"
                    />
                  </div>
                  <div className="row">
                    <MPSCustomButton
                      onClickHandler={handleSubmit(RecoverPassword)}
                      buttonColor="primary"
                      buttonIcon="bi-person-lock"
                      customClass="mt-2 col-12"
                      text="Recover Password"
                    />
                  </div>
                </div>
              )}
              {isOTPSent === true && isOTPVerified === false && (
                <div>
                  <div className="row">
                    <MPSTextComponent
                      label="OTP"
                      colLg={12}
                      colMd={12}
                      colSm={12}
                      showRequiredAsterisk={true}
                      register={{
                        ...register2("OTP", {
                          required: true,
                          validate: (value) => {
                            return !!value.trim();
                          },
                        }),
                      }}
                      errors={errors2}
                      placeholder="Enter OTP"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: "40px",
                      alignItems: "center",
                    }}>
                    <div>
                      {seconds > 0 || minutes > 0 ? (
                        <p>
                          Time Remaining:{" "}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      ) : (
                        <p>Didn't recieve the OTP ?</p>
                      )}
                    </div>
                    <div>
                      {" "}
                      <button
                        disabled={seconds > 0 || minutes > 0}
                        style={{
                          color:
                            seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                          border: "0px",
                          backgroundColor: "inherit",
                          padding: "0px",
                          margin: "0px",
                          textDecoration: "underline",
                        }}
                        onClick={resendOTP}>
                        Resend OTP
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <MPSCustomButton
                      onClickHandler={handleSubmit2(SubmitOTP)}
                      buttonColor="primary"
                      buttonIcon="bi-person-check"
                      customClass="col-12"
                      text="Submit"
                    />
                  </div>
                </div>
              )}
              {isOTPSent === true && isOTPVerified && (
                <div>
                  <div>
                    <label>New Password</label>
                    <div className="d-flex gap-1">
                      <div style={{ width: "100%" }}>
                        <MPSInputText
                          type={textType}
                          errors={errors3}
                          register={{
                            ...register3("NewPassword", { required: true }),
                          }}
                          onChange={(e) => onChangeNewPasswordHandler(e)}
                          placeholder="Enter New Password"
                        />
                      </div>
                      <div>
                        <MPSCustomButton
                          buttonIcon={buttonIcon}
                          text=""
                          buttonColor="info"
                          onClickHandler={onChangeTextType}
                        />
                      </div>
                    </div>

                    <MPSTextComponent
                      colLg={12}
                      colMd={12}
                      colSm={12}
                      label="Confirm Password"
                      errors={errors3}
                      type="password"
                      placeholder="Confirm Password"
                      register={{
                        ...register3("ConfirmPassword", {
                          required: true,
                          validate: (value) =>
                            value === getValues3("NewPassword"),
                        }),
                      }}
                    />

                    <MPSCustomButton
                      onClickHandler={handleSubmit3(SavePassword)}
                      buttonColor="primary"
                      buttonIcon="False"
                      customClass="mt-3 col-12"
                      text="Change Password"
                      showButtonConfirmation={true}
                      buttonConfirmationText="You want to change password"
                    />
                    <div className="mt-4">
                      {passwordExpression.map((exp) => {
                        return (
                          <div>
                            <div className="d-flex gap-2">
                              <div>
                                <i
                                  className={`bi ${exp.icon}`}
                                  style={{
                                    fontSize: "15px",
                                    color: exp.isVerified ? "green" : "red",
                                  }}></i>
                              </div>
                              <div>
                                <h5
                                  style={{
                                    fontSize: "15px",
                                    color: exp.isVerified ? "green" : "red",
                                  }}>
                                  {exp.title}
                                </h5>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
