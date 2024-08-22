import React, { useState } from "react";

import Webportal from "@/container/Webportal";
import { useForm } from "react-hook-form";
import PageWrapper from "@/common/PageWrapper";
import Swal from "sweetalert2";
import * as helpers from "./../../lib/Helpers";
import axios from "@/serviceCall/axios";
import { MPSTextComponent } from "@/MPSComponents/Inputs/MPSInputComponent";
import MPSInputText from "@/MPSComponents/Inputs/MPSInputText";
import { MPSCustomButton } from "@/MPSComponents/Buttons/MPSCustomButton";

interface ChangePasswordInputs {
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}

const ChangePassword = ({ Reset }: { Reset: VoidFunction }) => {
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

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInputs>({ mode: "onChange" });

  const Save = async (data: ChangePasswordInputs) => {
    if (data.OldPassword === data.NewPassword) {
      Swal.fire({
        titleText: "New Password should be different from Old Password",
        icon: "error",
      });
      return;
    }

    let isInValid = 0;
    for (let index = 0; index < passwordExpression.length; index++) {
      if (passwordExpression[index].isVerified === false) {
        isInValid += 1;
      }
    }

    if (isInValid > 0) {
      Swal.fire({
        titleText: "Choose Strong Password",
        icon: "error",
      });
      return;
    }

    await axios
      .get(
        `/home/UniHome/ChangePassword?UserId=${encodeURIComponent(
          helpers.UserId()
        )}&OldPassword=${encodeURIComponent(
          data.OldPassword
        )}&NewPassword=${encodeURIComponent(data.NewPassword)}`
      )
      .then((resp) => {
        if (resp.data.data[0].ResponseType === "success") {
          Swal.fire({
            titleText: resp.data.data[0].ResponseMessage,
            icon: "success",
          });
          reset({
            ConfirmPassword: null,
            NewPassword: null,
            OldPassword: null,
          });
          setButtonIcon("bi-eye-slash");
          setTextType("password");
          Reset();
        } else {
          Swal.fire({
            titleText: resp.data.data[0].ResponseMessage,
            icon: "error",
          });
        }
      });
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
    errors.NewPassword = null;
    setTextType(textType === "password" ? "text" : "password");
    setButtonIcon(textType === "password" ? "bi-eye" : "bi-eye-slash");
  };

  return (
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      <MPSTextComponent
        colLg={12}
        colMd={12}
        colSm={12}
        label="Old Password"
        errors={errors}
        type="password"
        register={{ ...register("OldPassword", { required: true }) }}
        placeholder="Enter Old Password"
      />

      <div>
        <label>New Password</label>
        <div className="d-flex gap-1">
          <div style={{ width: "100%" }}>
            <MPSInputText
              type={textType}
              errors={errors}
              register={{ ...register("NewPassword", { required: true }) }}
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
      </div>

      <MPSTextComponent
        colLg={12}
        colMd={12}
        colSm={12}
        label="Confirm Password"
        errors={errors}
        type="password"
        placeholder="Confirm Password"
        register={{
          ...register("ConfirmPassword", {
            required: true,
            validate: (value) => value === getValues("NewPassword"),
          }),
        }}
      />

      <MPSCustomButton
        onClickHandler={handleSubmit(Save)}
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
  );
};
export default PageWrapper(ChangePassword, 1000);
