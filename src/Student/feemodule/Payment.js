import React, { useState, useEffect } from "react";
import axios from "axios";
import Axios from "axios";
import queryString from 'query-string';
import Config from '../../config.json'
// import Styles from './feeportal.module.css';
import Styles from '../studentdashboard.module.css';
import Studentnav from '../studentnav';

const PaymentStudent = (props) => {
  let data = localStorage.getItem("userdetail");
  data = JSON.parse(data);
  const [token, setToken] = useState(data.token);
  const [name, setName] = useState(data.username);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    console.log(props.location.state.id);
    var formdata = new FormData();
    formdata.append('payment_type', 'Paytm');
    formdata.append('installment_plan_id', props.location.state.id);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        'Authorization': 'Token ' + token
      },
    };
    fetch(Config.SERVER_URL + "payment/collect-payment-support/", requestOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setAmount(json.param_dict.TXN_AMOUNT);
        setEmail(json.param_dict.CUST_ID);
      })
      .catch(error => {
        console.log('error', error)
      });
  }, [])

  const handleSuccess = (res) => {
    // separate key and values from the res object which is nothing but param_dict
    let keyArr = Object.keys(res);
    let valArr = Object.values(res);

    // when we start the payment verification we will hide our Product form
    document.getElementById("paymentFrm").style.display = "none";

    // Lets create a form by DOM manipulation
    // display messages as soon as payment starts
    let heading1 = document.createElement("h1");
    heading1.innerText = "Redirecting you to the paytm....";
    let heading2 = document.createElement("h1");
    heading2.innerText = "Please do not refresh your page....";

    //create a form that will send necessary details to the paytm
    let frm = document.createElement("form");
    frm.action = "https://securegw-stage.paytm.in/order/process/";
    frm.method = "post";
    frm.name = "paytmForm";

    // we have to pass all the credentials that we've got from param_dict
    keyArr.map((k, i) => {
      // create an input element
      let inp = document.createElement("input");
      inp.key = i;
      inp.type = "hidden";
      // input tag's name should be a key of param_dict
      inp.name = k;
      // input tag's value should be a value associated with the key that we are passing in inp.name
      inp.value = valArr[i];
      // append those all input tags in the form tag
      frm.appendChild(inp);
    });

    // append all the above tags into the body tag
    document.body.appendChild(heading1);
    document.body.appendChild(heading2);
    document.body.appendChild(frm);
    // finally submit that form
    frm.submit();

    // if you remember, the param_dict also has "'CALLBACK_URL': 'http://127.0.0.1:8000/api/handlepayment/'"
    // so as soon as Paytm gets the payment it will hit that callback URL with some response and
    // on the basis of that response we are displaying the "payment successful" or "failed" message
  };

  const startPayment = async () => {
    let bodyData = new FormData();

    // send data to the backend
    bodyData.append("amount", amount);
    bodyData.append("name", name);
    bodyData.append("email", email);

    await Axios({
      url: Config.SERVER_URL + `payment/collect-payment-support-handle/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      // we will retrieve the param_dict that we are sending from the backend with
      // all the necessary credentials, and we will pass it to the handleSuccess() func
      //  for the further process
      if (res) {
        handleSuccess(res.data.param_dict);
      }
    });
  };

  return (
    <div>
      <Studentnav />
      <div class="container">
        <div class="row">
          <div className="col-md-12" style={{ marginTop: '50px' }}>
            <div class="title">
              <p style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', display: 'inline-block' }}>Make Payment</p>
            </div>
            <div id="paymentFrm" className="container" style={{ marginTop: "5vh" }}>
              <center>
                <div style={{ maxWidth: '600px', border: '1px solid lightgrey', padding: '30px', borderRadius: '10px' }}>
                  <form>
                    <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#EA7A26' }}>Payment Details</p>
                    <div className="form-group">
                      <label style={{ float: 'left' }} htmlFor="name">Student name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ float: 'left' }} htmlFor="exampleInputPassword1">Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        id="amount"
                        value={amount}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ float: 'left' }} htmlFor="exampleInputPassword1">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={email}
                        disabled
                      />
                    </div>
                  </form>
                  <button onClick={startPayment} style={{ background: '#EA7A26', border: 'none', borderRadius: '37px', marginTop: '20px' }} className="btn btn-primary btn-block">
                    Proceed To Pay
                  </button>

                </div>
              </center>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default PaymentStudent;
