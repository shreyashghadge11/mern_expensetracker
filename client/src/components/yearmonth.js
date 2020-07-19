import React,{useState} from 'react';
import {Form} from 'react-bootstrap';
import { connect } from "react-redux";
import {getexpense} from '../actions/actions';
import Transactions from './transactions';

const YearMonth = ({getexpense}) =>{
    const [month,setMonth] = useState('January');
  const [year,setYear] = useState(2020);

    const handleMonthChange=(e)=>{
        setMonth(e.target.value);
        console.log(month);
        getexpense(month);
      }
      const handleYearChange=(e)=>{
        setYear(e.target.value);
        console.log(year);
      }
      const formSubmit=e =>{
          e.preventDefault();
          getexpense(month);
      }
   
    return(
        <div>
            <div className="container py-2 my-2" style={{backgroundColor:'#ff7675',margin:"10px auto"}}>
                <Form onClick={(e)=>formSubmit(e)}>
                    
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Year</Form.Label>
                        <Form.Control as="select" onChange={(e)=>handleYearChange(e)} defaultValue='2020' custom>
                        <option value="2020" id="2020">2020</option>
                        
                        </Form.Control>
                    </Form.Group>
                
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Month</Form.Label>
                        <Form.Control as="select" onChange={(e)=>handleMonthChange(e)} defaultValue='January' custom>
                        <option value="January" id="January">January</option>
                        <option value="February" id="February">February</option>
                        <option value="March" id="March">March</option>
                        <option value="April" id="April">April</option>
                        <option value="May" id="May">May</option>
                        <option value="June" id="June">June</option>
                        <option value="July" id="July">July</option>
                        <option value="August" id="August">August</option>
                        <option value="September" id="September">September</option>
                        <option value="October" id="October">October</option>
                        <option value="November" id="November">November</option>
                        <option value="December" id="December">December</option>
                        </Form.Control>
                    </Form.Group>
                    
                </Form>
            </div>
            <Transactions month={month} year={year}/>
        </div>
    );
};
const mapDispatchToProps = dispatch => {
    return {
      getexpense: month => dispatch(getexpense(month))
    }
  }
export default connect(null,mapDispatchToProps)(YearMonth);

/* */