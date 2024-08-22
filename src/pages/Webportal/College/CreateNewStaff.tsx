import PageWrapper from "@/common/PageWrapper";
import Webportal from "@/container/Webportal";
import {
  MPSButtonEdit,
  MPSButtonSave,
  MPSSelectComponent,
  MPSTextComponent,
} from "@/MPSComponents/MPSComponents";
import React from "react";
import { useForm } from "react-hook-form";

interface CreateNewStaffFields {
  Name: string;
  Email: string;
  Gender: string;
  Department: string;
  Mobile: string;
  Designation: string;
  Remarks: string;
}

const CreateNewStaff = () => {
  const data = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  const deptdata = [
    {
      label: "Accounts",
      value: "accounts",
    },
    {
      label: "CSE",
      value: "cse",
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    formState: { errors },
  } = useForm<CreateNewStaffFields>();
  return (
    <Webportal>
      <div className="row">
        <MPSTextComponent
          register={register("Name", { required: true })}
          errors={errors}
          label="Name"
        />
        <MPSTextComponent
          register={register("Email", { required: true })}
          errors={errors}
          label="Email"
        />
        <MPSSelectComponent
          register={register("Gender", { required: true })}
          errors={errors}
          label="Gender"
          options={data}
          selectLabel="label"
          selectValue="value"
        />
        <MPSSelectComponent
          register={register("Department", { required: true })}
          errors={errors}
          label="Department"
          options={deptdata}
          selectLabel="label"
          selectValue="value"
        />
        <MPSTextComponent
          register={register("Mobile", { required: true })}
          errors={errors}
          label="Mobile"
        />
        <MPSTextComponent
          register={register("Designation", { required: true })}
          errors={errors}
          label="Designation"
        />

        {/* <MPSTextComponent register={register('Remarks',{required:true})} errors={errors} label="Remarks"/> */}
        <MPSButtonSave
          onClickHandler={handleSubmit((data: CreateNewStaffFields) => {
            console.log(data);
          })}
          className="mt-2"
        />
      </div>
    </Webportal>
  );
};

export default PageWrapper(CreateNewStaff, 2);
