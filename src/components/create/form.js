import React, {useState} from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import validationsForm from "./validationSchema";
import { withFormik } from "formik";
import * as yup from "yup";
import { styles } from "./styles";
import MealForm from "./mealForm";

const Formm = (props) => {
  const [order, setOrder] = useState(null)
  
   const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
   } = props;
  const handleSubmitCustom = (e) => {
    const ofisant = e.target[0].value
    const masa = e.target[2].value
    setOrder({
      masa,
      ofisant,
      "status": "sonlanmayan",
      "cemMebleg": 0,
      "sonlanmatarixi": null,
      "yemekler": [
        
      ]
    })
    handleSubmit(e)
  }
   return (
    <div className={classes.container+" mainForm"}>
      <form onSubmit={handleSubmitCustom}>
              <Card className={classes.card + " cardSp"}>
                  <div className="create__selectWrapper">

               
                  <div className="create__select">
             <TextField
              select
              id="course"
              label="Ofisant"
              value={values.ofisant}
              onChange={handleChange("ofisant")}
              helperText={touched.ofisant ? errors.ofisant : ""}
              error={touched.ofisant && Boolean(errors.ofisant)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              <MenuItem value={"ali"}>Ali</MenuItem>

              <MenuItem value={"Veli"}>Veli</MenuItem>

              <MenuItem value={"Osman"}>Osman</MenuItem>

              <MenuItem value={"Anar"}>Anar</MenuItem>
            </TextField>
                  </div>
                  <div className="create__select">
             <TextField
              select
              id="course"
              label="Masa"
              value={values.masa}
              onChange={handleChange("masa")}
              helperText={touched.masa ? errors.masa : ""}
              error={touched.masa && Boolean(errors.masa)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              <MenuItem value={"m1"}>m1</MenuItem>
              <MenuItem value={"m2"}>m2</MenuItem>
              <MenuItem value={"m3"}>m3</MenuItem>
             </TextField>
            </div>
            </div>
           <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR 
            </Button>
          </CardActions>
        </Card>
       </form>
{    order?.masa && order?.ofisant &&   
<MealForm order={order} setOrder={setOrder}/>}
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({
    ofisant,
    masa
   }) => {
    return {
      ofisant: ofisant || "",
      masa: masa || ""
     };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: (values, { setSubmitting }) => {
console.log(values, 'vall');
   },
})(Formm);

export default withStyles(styles)(Form);
