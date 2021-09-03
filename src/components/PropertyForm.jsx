import "../css/PropertyForm.css";
import { useState } from "react";
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import base from "../AirtableBaseKey.js";

const PropertyForm = ({addItem}) => {


    const [formInputValue, setFormInputValue] = useState({
        id: null, 
        name: "",
        description: "",
        size: 0
    });

    const inputFieldsChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setFormInputValue({...formInputValue, [fieldName]: fieldValue});
    }


    const {name, description, size} = formInputValue;


    const saveInputDataOnServer = async () => {
      //Save Property data on Airtable Server
      try {
        const records = await base("Table 1").create([
          {
            "fields": {
              "name": name,
              "description": description,
              "size": parseInt(size)
            }
          }
        ]);
        //add new item to local array list
        addItem({id: records[0].id, name: records[0].fields.name, description: records[0].fields.description, size: records[0].fields.size});
        setFormInputValue({name: "", description: "", size: 0});

      } catch (error) {
        console.log(error.message);
      }
    }


    const formSubmit = (event) => {
        event.preventDefault();
        saveInputDataOnServer();
    }

   


    return(
        <>
        <div className="form_div">
        <form onSubmit={formSubmit} >
        <div className="form_inner_div">
        <div className="form_input_div">
          <label htmlFor="input_name" className="form_label">Property Name</label><br/>
          <input  className="form_input_field" type="text" id="input_name" placeholder="Enter property name" value={name} onChange={inputFieldsChange} name="name" />
        </div>

        <div className="form_input_div">
          <label htmlFor="input_description"  className="form_label">Property Description</label><br/>
          <textarea  className="form_input_field" style={{height: "100px"}} type="text" id="input_description" placeholder="Enter property description" value={description} onChange={inputFieldsChange} name="description" />
        </div>

        <div className="form_input_div">
          <label htmlFor="input_size"  className="form_label">Property Size</label><br/>
          <input  className="form_input_field" type="number" id="input_size" placeholder="Enter size" value={size} onChange={inputFieldsChange} name="size" />
        </div>
        <Button className="add_property_btn" type="submit" startIcon={<ListIcon style={{color: "white", fontSize: "25px"}}/>} >Add</Button>
        </div>
        </form>

        </div>
        
        </>
    );
}

export default PropertyForm;