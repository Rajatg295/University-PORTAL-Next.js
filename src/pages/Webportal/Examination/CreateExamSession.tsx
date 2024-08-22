import PageWrapper from "@/common/PageWrapper";
import {
  MPSButtonSave,
  MPSModel,
  MPSSelectComponent,
  MPSTable,
  MPSTextComponent,
  MPSToast,
} from "../../../../src/MPSComponents/MPSComponents";
import Webportal from "../../../../src/container/Webportal";
import axios from "../../../../src/serviceCall/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const MonthsList = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

type Inputs = {
  es_Id: number;
  es_Session: string;
  es_MonthNo: number;
  es_Name: string;
};

const CreateExamSession = () => {
  const [ExamSessionList, setExamSessionList] = useState<any[]>([]);
  const [ExamSessionYearList, setExamSessionYearList] = useState<any[]>([]);
  const [ExamSessionYearDetail, setExamSessionYearDetail] = useState<any>(null);
  const [ExamSessionMonthDetail, setExamSessionMonthDetail] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [isCurrent, setIsCurrent] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  useEffect(() => {
    if (!ExamSessionMonthDetail || !ExamSessionYearDetail) {
      setValue("es_Name", null);
    } else {
      setValue(
        "es_Name",
        ExamSessionMonthDetail?.label + '-' + ExamSessionYearDetail?.label
      );
    }
  }, [ExamSessionMonthDetail, ExamSessionYearDetail]);

  useEffect(() => {
    BindExamSessionYear();
    BindExamSession();
  }, []);

  const BindExamSessionYear = async () => {
    const YearList = [];
    for (
      let index = new Date().getFullYear() - 2;
      index <= new Date().getFullYear() + 2;
      index++
    ) {
      YearList.push({ label: index });
    }
    setExamSessionYearList(YearList);
  };

  const Fields = [
    {
      FieldValue: "es_Name",
      FieldHeader: "Exam Session",
    },
    {
      FieldValue: "es_Session",
      FieldHeader: "Session",
    },
    {
      FieldValue: "es_month",
      FieldHeader: "Month Name",
    },
    {
      FieldValue: "es_MonthNo",
      FieldHeader: "Month No.",
    },
  ];


  const onSubmit = async (data: Inputs) => {
    const dataObj = {
      es_Id: currentEditId || 0,
      es_Name: data.es_Name,
      es_IsCurrent: isCurrent,
      es_Session: data.es_Session,
      es_MonthNo: data.es_MonthNo,
      es_month: ExamSessionMonthDetail?.label,
      es_IsActive: isActive,
    };

    try {
      const response = await axios.post(
        "organization/examination/examSession/ExamSessionMasterInsert",
        dataObj
      );
      if (response.data.statusCode === 200) {
        Swal.fire({ titleText: "Data saved successfully", icon: "success" });
        console.log(dataObj);
        BindExamSession();
        setEditMode(false);
        setCurrentEditId(null);
        reset();
        setExamSessionMonthDetail(null);
        setExamSessionYearDetail(null);
      } else {
        alert("Failed to create exam session");
      }
    } catch (error) {
      console.error("Error creating exam session:", error);
      alert("An error occurred while creating the exam session");
    }
  };

  const BindExamSession = async () => {
    try {
      const response = await axios.get(
        "organization/examination/examSession/ExamSessionMasterSelect"
      );

      if (response.data.statusCode === 200) {
        setExamSessionList(response.data.data);
        console.log(response);
      } else {
        alert("Failed to fetch exam sessions");
      }
    } catch (error) {
      console.error("Error fetching exam sessions:", error);
      alert("An error occurred while fetching the exam sessions");
    }
  };

  const onEdit = (data) => {
    setEditMode(true);
    setCurrentEditId(data.es_Id);

    setValue("es_Id", data.es_Id);
    setValue("es_Name", data.es_Name);
    setValue("es_Session", data.es_Session);
    setValue("es_MonthNo", data.es_MonthNo);
    setIsActive(data.es_IsActive);
    setIsCurrent(data.es_IsCurrent);

    const monthDetail = MonthsList.find((month) => month.value === data.es_MonthNo);
    setExamSessionMonthDetail(monthDetail || null);

    const yearDetail = ExamSessionYearList.find((year) => year.label === data.es_Session);
    setExamSessionYearDetail(yearDetail || null);
  };

  return (
    <Webportal>
      <div className="row">
        <MPSSelectComponent
          value={ExamSessionMonthDetail}
          options={MonthsList}
          selectLabel={"label"}
          selectValue={"value"}
          register={register("es_MonthNo", { required: true })}
          errors={errors}
          label="Exam Session Month"
          placeholder="Select Exam Session Month"
          onChange={(val: any) => {
            errors.es_MonthNo = null;
            if (val) {
              setExamSessionMonthDetail(val);
              setValue("es_MonthNo", val.value);
            } else {
              setExamSessionMonthDetail(null);
              setValue("es_MonthNo", null);
            }
          }}
        />

        <MPSSelectComponent
          value={ExamSessionYearDetail}
          options={ExamSessionYearList}
          selectLabel={"label"}
          selectValue={"label"}
          register={register("es_Session", { required: true })}
          errors={errors}
          label="Exam Session Year"
          placeholder="Select Exam Session Year"
          onChange={(val: any) => {
            errors.es_Session = null;
            if (val) {
              setExamSessionYearDetail(val);
              setValue("es_Session", val.label);
            } else {
              setExamSessionYearDetail(null);
              setValue("es_Session", null);
            }
          }}
        />
        <MPSTextComponent
          register={register("es_Name", { required: true })}
          errors={errors}
          label="Exam Session Name"
        />


        {/* <div className="col-sm-6 mt-2">
          <br />
          
          <input
            type="checkbox"
            id="chkIsActive"
            checked={isActive}
            onChange={(e: any) => setIsActive(e.target.checked)}
          />
          &nbsp;&nbsp;&nbsp;
          <label htmlFor="chkIsActive">Active</label>
          <input
            type="checkbox"
            id="chkIsCurrent"
            checked={isCurrent}
            onChange={(e: any) => setIsCurrent(e.target.checked)}
            style={{ marginLeft: "15px", marginTop: "5px" }}
          />
          &nbsp;&nbsp;&nbsp;
          <label htmlFor="chkIsCurrent">Current</label>
        </div> */}

        <div className="row mt-3">
          <div>
            <input
              type="checkbox"
              id="chkIsActive"
              checked={isActive}
              onChange={(e: any) => setIsActive(e.target.checked)}
            />
            &nbsp;&nbsp;&nbsp;
            <label htmlFor="chkIsActive">Active</label>
          </div>
          <div className="col-md-4">
            <input
              type="checkbox"
              id="chkIsCurrent"
              checked={isCurrent}
              onChange={(e: any) => setIsCurrent(e.target.checked)}
            />
            &nbsp;&nbsp;&nbsp;
            <label htmlFor="chkIsCurrent">Current</label>
          </div>
        </div>


      </div>

      <MPSButtonSave onClickHandler={handleSubmit(onSubmit)} className="mt-2" />

      <MPSTable
        showGlobalFilter={true}
        data={ExamSessionList}
        fields={Fields}
        showCSVExport={true}
        showExcelExport={true}
        showFilter={false}
        isEditable={true}
        onEdit={onEdit}
      />
    </Webportal>
  );
};

export default PageWrapper(CreateExamSession, 1006);
