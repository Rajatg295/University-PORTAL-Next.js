export const InputErrorMessage = (props: any) => {
  //console.log(props);
  //////console.log(props.fieldName);

  if (props.fieldName.type === "required") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * This Field is required
      </span>
    );
  } else if (props.fieldName.type === "minLength") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * Type more Value
      </span>
    );
  } else if (props.fieldName.type === "maxLength") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * Character length is exceed
      </span>
    );
  } else if (props.fieldName.type === "min") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * Invalid Minimum Value
      </span>
    );
  } else if (props.fieldName.type === "max") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * value exceed as per requirement
      </span>
    );
  } else if (props.fieldName.type === "pattern") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * Invalid Format
      </span>
    );
  } else if (props.fieldName.type === "validate") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * Not Matched
      </span>
    );
  } else {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * Invalid Format
      </span>
    );
  }
};
