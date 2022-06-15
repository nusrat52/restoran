import React, { useState } from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import { validationsFormFormeal } from "./validationSchema";
import { withFormik } from "formik";
import * as yup from "yup";
import { styles } from "./styles";
import { Agent } from "../../api/agent"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { putOrder } from "../../redux/actions";
import { useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
 import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Formm = (props) => {
  const location = useNavigate()
  const dispatch=useDispatch()
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
    order,
    setOrder,
  } = props;

  const [price, setPrice] = useState(null);
  const [count, setCount] = useState(null);
  const [name, setName] = useState(null);
  const [status, setStatus] = useState("sonlanmayan");
  const wholePrice = parseInt(price * count);
const {id}=useParams()
  const handleCustomChange = (strin) => {
    return (e) => {
      if (strin === "adi") {
        const price = parseInt(e.target.value.split("-")[1]);
        const name = e.target.value.split("-")[0];
        setName(name);
        setPrice(price);
        handleChange("adi")(e);
        return;
      }
      handleChange("miqdari")(e);
      setCount(e.target.value);
    };
  };
    
    
    const handleCostomSubmit = (e) => {
        if(name, count>0){
        setOrder({...order, yemekler:[...order.yemekler, {
            "adi": name,
            "miqdari": count,
            "butunMebleg": wholePrice,
            "sifarisSaati": timetaker(),
            "status": "gozlemede"
        }]
        })
            setTimeout(() => { setCount(null); setName(null);setPrice(null) },1000)
        } 
        handleSubmit(e)
    }

  const deleteMeal = (index) => {
    let mealsMock = order.yemekler
    mealsMock.splice(index, 1)
   setOrder({...order, yemekler:mealsMock})
}

    const makeAnOrder =async () => {
      if (order.yemekler.length > 0) {
        const wholePrice=order.yemekler.reduce(function (accumulator, curValue) {

          return accumulator + curValue['butunMebleg']
        
        }, 0)
        dispatch(putOrder({...order,status,  cemMebleg:wholePrice}))
             const response = await Agent.putOrders({...order,status, cemMebleg:wholePrice}, id)
          if (response)
             location("/")
    }
    }



  const timetaker = () => {
    function addZero(i) {
      if (i < 10) {i = "0" + i}
      return i;
    }
    
    const d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let s = addZero(d.getSeconds());
    let time = h + ":" + m
    return time
}


  return (
    <div className={classes.container + " mealForm"}>
      <div className="sifarish">
        <div>
          <div>
         <p className="sifarish__text">
           <span className="sifarish__text_bold">ofisant: </span>
          {order.ofisant}
        </p>
        <p className="sifarish__text">
          <span className="sifarish__text_bold"> masa: </span> {order.masa}
        </p>
          </div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          label="Status"
                >
           <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"sonlanmayan"}>sonlanmayan</MenuItem>
          <MenuItem value={"sonlanan"}>sonlanan</MenuItem>
          <MenuItem value={"ləğv edilən"}>ləğv edilən</MenuItem>
        </Select>
      </FormControl>
        </div>
        {order.yemekler.map((yemek, index) => (
            <div key={index} className="yemekler">
                <div className="mealEdit__div">
             <p  className="sifarish__text">
              <span className="sifarish__text_bold"> {yemek.adi} </span> x
              {yemek.miqdari}
            </p>
            <p  className="sifarish__text">
              <span className="sifarish__text_bold">Qiymət: </span> 
              {yemek.butunMebleg}
                </p>
                <p  className="sifarish__text">
              <span className="sifarish__text_bold">Sifariş saatı: </span>
              {yemek.sifarisSaati}
            </p>
            </div>
            <div  >
             <IconButton onClick={()=>deleteMeal(index)} aria-label="delete">
             <DeleteIcon />
              </IconButton>
     
            </div>

          </div>
        ))}
      <Button onClick={makeAnOrder} color="primary" disabled={isSubmitting}>
              Sifarişi redakte et
      </Button>
      </div>
      <form onSubmit={handleCostomSubmit}>
        <Card className={classes.card + " cardSp"}>
          <div className="create__selectWrapper">
            <div className="create__select">
              <TextField
                select
                id="adi"
                label="Yemek"
                value={values.adi}
                onChange={handleCustomChange("adi")}
                helperText={touched.adi ? errors.adi : ""}
                error={touched.adi && Boolean(errors.adi)}
                margin="dense"
                variant="outlined"
                fullWidth
              >
                <MenuItem value={"dolma-4"}>Dolma</MenuItem>
                <MenuItem value={"dovga-2"}>Dovga</MenuItem>
                <MenuItem value={"plov-2"}>Plov</MenuItem>
                <MenuItem value={"doner-1.5"}>Doner</MenuItem>
                </TextField>
            </div>
            <div className="create__select">
              <TextField
                id="course"
                label="Miqdari"
                value={values.miqdari}
                onChange={handleCustomChange("miqdari")}
                helperText={touched.miqdari ? errors.miqdari : ""}
                error={touched.miqdari && Boolean(errors.miqdari)}
                margin="dense"
                variant="outlined"
                type="number"
                fullWidth
              />
            </div>
          </div>
          <h1>Qiyməti: {wholePrice}</h1>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button id="clearbutton" color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({ adi, miqdari }) => {
    return {
      adi: adi || "",
      miqdari: miqdari || "",
    };
  },
   validationSchema: yup.object().shape(validationsFormFormeal),
   handleSubmit: (values, { setSubmitting }) => {
       setTimeout(() => {
           document.querySelector("#clearbutton").click()
             setSubmitting(false);
    }, 1000);
  },
})(Formm);

export default withStyles(styles)(Form);
