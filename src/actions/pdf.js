import { format as formatDate } from "date-fns";
import http from "../utils/api/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/pdfTypes";

const base64toPDF = (data) => (dispatch) => {
  const { binary, fileName } = data;
  const link = document.createElement("a");
  const dateNow = formatDate(new Date(), "dd/MM/yyyy");
  document.body.appendChild(link);
  link.href = binary;
  link.download = `${fileName}_${dateNow}.pdf`;
  link.click();
  link.remove();
  dispatch({
    type: types.CREATE_PDF_SUCCESS,
  });
};

export function createPdf(values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.CREATE_PDF_REQUEST,
      });
      const response = await http.post(`${process.env.REACT_APP_API_URL}/pdf`, {
        ...values,
      });
      await dispatch(base64toPDF(response.data));
      dispatch(showSnackbar("success", "PDF Generated"));
    } catch (e) {
      dispatch({
        type: types.CREATE_PDF_FAILURE,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
