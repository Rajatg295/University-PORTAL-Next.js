import { useForm } from "react-hook-form";
import {
  MPSButtonSave,
  MPSSelectComponent,
  MPSTable,
  MPSTextComponent,
} from "../MPSComponents";
import { useState } from "react";

export const MPSObjectComponent = ({
  dataObj,
  onSubmit,
}: {
  dataObj: any[];
  onSubmit: Function;
}) => {
  const [myDataArray, setMyDataArray] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
  });

  const onSubmitData = (data) => {
    setMyDataArray([...myDataArray, data]);
  };

  const fields = dataObj.map((obj) => {
    return {
      FieldValue: obj.type === "select" ? obj.fieldLabel : obj.name,
      FieldHeader: obj.label,
    };
  });

  return (
    <>
      <div className="row">
        {dataObj.map((data, index: number) => {
          return GetComp({
            type: data.type,
            label: data.label,
            register: {
              ...register(
                data.type === "select" ? data.fieldValue : data.name,
                {
                  required: true,
                }
              ),
            },
            errors: errors,
            fieldLabel: data.fieldLabel,
            fieldValue: data.fieldValue,
            setValue: setValue,
            dataArray: data.dataArray,
            key: index,
          });
        })}
      </div>
      <div className="row mt-2">
        <div className="col-sm d-flex gap-2">
          <MPSButtonSave
            onClickHandler={handleSubmit(onSubmitData)}
            text="ADD"
            className="btn btn-warning"
            showConfirmation={false}
          />
          <MPSButtonSave
            onClickHandler={() => {
              onSubmit(myDataArray);
            }}
            showConfirmation={false}
          />
        </div>
      </div>
      <MPSTable
        fields={fields}
        data={myDataArray}
        showFilter={false}
        showPagination={false}
        showSorting={true}
        isDeletable={true}
        onDelete={(jj) => {
          //////console.log(jj);
          setMyDataArray(myDataArray.filter((o, i) => jj.index !== i));
        }}
      />
    </>
  );
};
const GetComp = ({
  type,
  label,
  register,
  errors,
  fieldLabel,
  fieldValue,
  setValue,
  dataArray,
  key,
}: {
  type: string;
  label: string;
  register: any;
  errors: any;
  fieldLabel?: string;
  fieldValue?: string;
  setValue?: any;
  dataArray: any[];
  key: number;
}) => {
  if (type === "input") {
    return (
      <MPSTextComponent
        colLg={3}
        colMd={4}
        colSm={6}
        label={label}
        register={register}
        errors={errors}
        key={key}
      />
    );
  } else if (type === "select") {
    return (
      <MPSSelectComponent
        colLg={3}
        colMd={4}
        colSm={6}
        key={key}
        options={dataArray}
        selectLabel={fieldLabel}
        selectValue={fieldValue}
        register={register}
        errors={errors}
        label={label}
        onChange={(val: any) => {
          errors[register.name] = null;
          if (val) {
            setValue(fieldValue, val[fieldValue]);
            setValue(fieldLabel, val[fieldLabel]);
          } else {
            setValue(fieldValue, null);
            setValue(fieldLabel, null);
          }
        }}
      />
    );
  }
};
