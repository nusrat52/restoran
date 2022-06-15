import * as yup from "yup";

const validationsForm = {
  ofisant: yup.string().required("Field is required"),
  masa: yup.string().required("Field is required"),
};

export default validationsForm;

export const validationsFormFormeal = {
  adi: yup.string().required("Field is required"),
  miqdari: yup.number().positive( "Must be positive character").required("Field is required"),
 };
