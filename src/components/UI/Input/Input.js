import React from 'react';
import './Input.css';

const Input =(props)=>{
    let inputElement=null;
    const inputClasses=[];
    let validationError = null;
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push('Invalid');
        validationError = <p className='ValidationError'>Please enter a valid value!</p>;
    }
    switch(props.elementtype){
        case('input'):
        inputElement=<input className={['Input',inputClasses].join(' ')} {...props.elementconfig} value={props.value}
        onChange={props.changed}/>;
        break;
        case('textarea'):
        inputElement=<textarea className='Textarea' {...props} value={props.value}
        onChange={props.changed} />;
        break;
        case('select'):
        inputElement=<select
         className='Textarea' {...props} 
         value={props.value}
         onChange={props.changed}
        >
         {props.elementconfig.options.map(option=>(
             <option  key={option.value} value={option.value}>{option.displayValue}</option>
         ))}
        </select>;
        break;
        default:
            inputElement=<input  {...props} value={props.value}
            onChange={props.changed}/>;
    }
    return(
    <div className='Input'>
    <label className='Label'>{props.label}</label>
     {inputElement}
     {validationError}
    </div>
    )
};
export default Input;