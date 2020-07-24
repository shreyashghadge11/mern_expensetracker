import React from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { deleteexpense, addexpense, updateexpense } from "../actions/actions";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const Transaction = ({
  month,
  year,
  expense,
  deleteexpense,
  addexpense,
  updateexpense,
}) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    description: "",
    amount: 0,
    id: "",
  });
  const [des, setDes] = useState("");
  const [amt, setAmt] = useState(0);

  const handleEdit = (des, amt, id) => {
    setData({ description: des, amount: amt, id: id });
    setAmt(amt);
    setDes(des);
    setEdit(true);
  };
  const handlechange = (e) => {
    if (e.target.name === "amount") {
      setAmt(Number(e.target.value));
      // console.log(amt)
    }
  };
  const handlechange2 = (e) => {
    if (e.target.name === "description") {
      setDes({ description: e.target.value });
      console.log(des);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const postdata = {
      description: des,
      amount: amt,
    };
    updateexpense(data.id, postdata);

    setEdit(false);
    // console.log(des,amt,data.id)
  };

  const iddelete = (id) => {
    deleteexpense(id);
  };
  return (
    <div className="container ">
      <Add month={month} year={year} addexpense={addexpense} />
      <div>
        {expense.transactions &&
          expense.transactions.map((item) => {
            return (
              <Card key={item._id} className="my-2">
                <Card.Body>
                  <Card.Title>{item.description}</Card.Title>
                  <Card.Text>{item.amount}</Card.Text>
                  <Button
                    variant="warning mx-2"
                    onClick={() =>
                      handleEdit(item.description, item.amount, item._id)
                    }
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => iddelete(item._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </div>
      {edit ? (
        <div>
          <h1 style={{ fontSize: "26px", color: "#0097e6" }}>Update Expense</h1>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={(e) => handlechange2(e)}
                placeholder="Enter description"
                defaultValue={data.description}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                onChange={(e) => handlechange(e)}
                placeholder="Amount"
                defaultValue={data.amount}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  );
};

const Add = ({ month, year, addexpense }) => {
  const [des, setDes] = useState("");
  const [amt, setAmt] = useState(0);
  const handlechangedes = (e) => {
    setDes(e.target.value);
    console.log(des);
  };
  const handlechange = (e) => {
    setAmt(Number(e.target.value));
    console.log(amt);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var newexpense = {
      description: des,
      amount: amt,
      month: month,
      year: year,
    };
    addexpense(newexpense);

    console.log(newexpense);
  };
  return (
    <div>
      <h1 style={{ fontSize: "26px", color: "#0097e6" }}>Add Expense</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={(e) => handlechangedes(e)}
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            onChange={(e) => handlechange(e)}
            placeholder="Amount"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expense: state.expense,
});
const mapDispatchToProps = (dispatch) => {
  return {
    deleteexpense: (id) => dispatch(deleteexpense(id)),
    addexpense: (data) => dispatch(addexpense(data)),
    updateexpense: (id, data) => dispatch(updateexpense(id, data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);

// Transaction.propTypes = {
//     deleteexpense: PropTypes.func.isRequired,
//     expense: PropTypes.array.isRequired,
//     month:PropTypes.string.isRequired
//     //loading: PropTypes.bool.isRequired
//  };
/*const Edit = ({setEdit,data}) =>{
    const [des,setDes] = useState('');
    const [amt,setAmt] = useState(0);
    const handlechange = e =>{
        if(e.target.name === "description"){
            setDes(e.target.value);
        }
        if(e.target.name === "amount"){
            setAmt(Number(e.target.value));
        }
    }
    const handleSubmit = e =>{
        e.preventDefault();
        updateexpense(data.id,{description:des,amount:amt});
        setEdit(false);
        console.log(des,amt)
    }
    return(
        <div>
            <h1 style={{fontSize:'26px',color:'#0097e6'}}>Update Expense</h1>
            <Form onSubmit={()=>handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" onChange={()=>handlechange} placeholder="Enter description" />
                    
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" name="amount" onChange={()=>handlechange} placeholder="Amount" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    )
} */
