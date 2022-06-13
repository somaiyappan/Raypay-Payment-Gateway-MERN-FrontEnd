import { Button, Card, CardContent, TextField, Typography,Modal, Stack } from '@mui/material'
import { React, useEffect } from 'react'

//redux
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateState } from "../features/userSlice"

import { styled } from "@mui/system";

import useState from 'react-usestateref'

import axios from "axios"

import marvelBG from "../images/marvelBG.jpg"
import { $CombinedState } from 'redux';


const textfieldBox = (theme) => ({
 
  ".MuiFormLabel-root.Mui-focused" :{
    color: "red !important"
  },
  ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" :{
    borderColor: "red !important"
  }
  
});

const DivStyle1 = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "0 auto",

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  [theme.breakpoints.down("md")]: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    width: "67%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  [theme.breakpoints.up("lg")]: {
    width: "82%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  [theme.breakpoints.up("xl")]: {
    width: "67%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default function Details() {

  const detailsForms = ["Name", "PhoneNo", "Email",]
  const cardName = [{ PlanName: "Standard", amount: "₹899", PlanAmount: "₹699" }, { PlanName: "Pro", amount: "₹999", PlanAmount: "₹799" }, { PlanName: "Ulimate", amount: "₹1199", PlanAmount: "₹999" }]


  //package selection
  const [styled, setStyled] = useState(2)
  
  const handleClick = (obj, indexNo) => {
    setStyled(indexNo)
    setsubmitButton({ ...submitButton, Plan: obj.PlanAmount })
    dispatch(setUser(submitButtonRef.current))
  }


  useEffect(() => {
    setsubmitButton({ ...submitButton, Plan: "₹9999" })
    dispatch(setUser(submitButtonRef.current))
  }, [])





  const dispatch = useDispatch();
  const useSelectData = useSelector(updateState)


  const [submitButton, setsubmitButton, submitButtonRef] = useState({
    "Name": "",
    "PhoneNo": "",
    "Email": "",

  })



  const handleChange = (text, value,) => {
    setsubmitButton({ ...submitButton, [text]: value })
    dispatch(setUser(submitButtonRef.current))
    
    const re = /^[0-9\b]+$/;
    if (text === "Name") {
      setsubmitButton({ ...submitButton, Name: value });
      seterrorName(false);
    }
    else if (text === "Email") {
      console.log("working");
      setsubmitButton({ ...submitButton, Email: value });
      seterrorEmail(false)
    }
    else if (text === "PhoneNo") {
      if (value === "" || re.test(value)) {
        setsubmitButton({ ...submitButton, "PhoneNo": (value = value.slice(0, 10)), });
        seterrorPhoneNo(false);
      }
    }



  }

  const handleClickButton = () => {

    const echecking = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    {
      submitButton["Name"] === "" ? seterrorName(true) :
        submitButton["Email"] === "" || !echecking.test(submitButton["Email"]) ? seterrorEmail(true) :
          submitButton["PhoneNo"] === "" ? seterrorPhoneNo(true) :
            seterrorPhoneNo(false);
    }
    if (submitButton["Name"] != "" && submitButton["Email"] != "" && echecking.test(submitButton["Email"]) && submitButton["PhoneNo"] != "") {
      setsubmitButton({ Name: "", Email: "", "PhoneNo": "", });
      console.log(useSelectData)
      setOpen(false)
      loadRazorpay()
    }

}



const [errorName, seterrorName] = useState(false);
const [errorEmail, seterrorEmail] = useState(false);
const [errorPhoneNo, seterrorPhoneNo] = useState(false);

const [open, setOpen] = useState(false)
const [handleClose, sethandleClose] = useState(false)
const [loading, setLoading] = useState(false);


function loadRazorpay() {
  console.log("loaf=dRazorPay")
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onerror = () => {
    alert('Razorpay SDK failed to load. Are you online?');
  };
  script.onload = async () => {
    try {
      setLoading(true);
     const result = await axios.post('http://localhost:3008/create-order', { name: useSelectData.Name, email: useSelectData.Email, contact: useSelectData.PhoneNo, amount: useSelectData.Plan + '00', });
      console.log("result "+JSON.stringify(result))
      const { amount, id: order_id, currency } = result.data;
      const { data: { key: razorpayKey }, } = await axios.get('http://localhost:3008/get-razorpay-key');

      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency,
        name: useSelectData.Name,
        description: "",
        order_id: order_id,
       
        prefill: {
          name: useSelectData.Name,
          email: useSelectData.Email,
          contact: useSelectData.PhoneNo,
        },
        notes: {
          address: 'example address',
        },
        theme: {
          color: '#FF4949',
        },
      };

      setLoading(false);
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };
  document.body.appendChild(script);
}




return (
  <>
 

<Modal open={open} onClose={()=>{setOpen(false)}} sx={{ backdropFilter: "blur(2px)" }} >

<DivStyle1 >
      <Card style={{ width: 520, height: 680, margin: "0 auto" }}>
       
<Typography variant='h4' sx={{backgroundColor:"red",paddingTop:1,color:"white"  ,paddingBottom:1,display:"flex",justifyContent:"center"}}>Subscription</Typography>
          {detailsForms.map((text, indexNo) => (
            <div style={{ marginTop: 35, paddingLeft: "5%", paddingRight: "5%" }}>
              <TextField error={text === "Name" ? text === "PhoneNo" ? errorPhoneNo : errorName : text === "Email" ? errorEmail :  null}
                helperText={text === "Name" ? !errorName ? "" : "Please enter your name" :text === "PhoneNo" ? !errorPhoneNo ? "" : "Please enter contact no" : 
                text === "Email" ? !errorEmail ? "" :"Please enter your valid mail id" :  null}
                value={submitButton[text]} fullWidth size="small" label={text} variant="outlined" onChange={(e) => { handleChange(text, e.target.value) }} sx={textfieldBox} />
            </div>
          ))}

          <Typography variant='h5' style={{ marginTop: 35, justifyContent: "center", display: "flex", fontWeight: "bold" }}>Choose Your Plan</Typography>

          <div style={{ display: "flex", marginTop: 35, justifyContent: "space-around", paddingLeft: "5%", paddingRight: "5%" }}>
            {cardName.map((obj, indexNo) => (
              <Card onClick={() => { handleClick(obj, indexNo) }} style={{
                width: 135, height: 145,
                border: indexNo === styled ? '2px solid red' : 'none',
                backgroundColor: indexNo === styled ? '#fedada' : 'white',
                boxShadow: indexNo === styled ? "rgba(0, 0, 0, 0.24) 8px 8px 8px" : "rgba(0, 0, 0, 0.10) 1px 1px 1px 1px", cursor: "pointer"
              }} >
                <CardContent>
                  <Typography variant='h6' style={{ justifyContent: "center", display: "flex", cursor: "pointer", fontWeight: "bold" }}>{obj.PlanName}</Typography>
                  <Typography variant='subtitle2' style={{ justifyContent: "center", display: "flex", cursor: "pointer", textDecoration: "line-through" }}> {obj.amount}</Typography>

                  <Typography variant='h6' style={{ justifyContent: "center", display: "flex", cursor: "pointer", fontWeight: "bold" }}> {obj.PlanAmount}</Typography>
                  <Button style={{
                    textTransform: "none",
                    backgroundColor: indexNo === styled ? 'red' : '#565064',
                    color: "white",
                    justifyContent: "center", display: "flex", marginLeft: 17, maxHeight: '30px', marginTop:15
                  }}>Monthly</Button>

                </CardContent>
              </Card>
            ))}
          </div>
          <Typography variant='subtitle1' style={{ marginTop: 30, justifyContent: "center", display: "flex", }}>* Buy now to a enjoy 30 days free trial</Typography>

          <div style={{ marginTop: 5, paddingLeft: "5%", paddingRight: "5%", }}>
            <Button fullWidth variant='h6' style={{ backgroundColor: "red", color: "white", textTransform: "none" }} onClick={handleClickButton}  >Next</Button>
          </div>

       
      </Card>
    </DivStyle1>
</Modal>

 <div style={{backgroundAttachment:"fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover",backgroundImage:`url(${marvelBG})`,height:"100vh",}}>
 <Stack gap={2} sx={{justifyContent:"center",display:"flex",alignItems:"center",height:"100vh",flexDirection:"column"}}>
<Typography variant='h3' sx={{color:"white",textAlign:"center"}}>Watch your faviourite movies now</Typography>

 <Button onClick={()=> { setOpen(true) }} sx={{backgroundColor:"red",color:"white",width:200,height:50,fontSize:18,textTransform:"none", "&:hover":{ backgroundColor:"red" } }} >Subscribe Now</Button>
</Stack>
 </div>
  </>
)
}
