import ListItem from "./ListItem";
import PropertyForm from "./PropertyForm";
import "../css/Home.css";
import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import base from "../AirtableBaseKey.js";



const Home = () => {

    const [propertyList, setPropertyList] = useState([]);
    const [formVisibility, setFormVisibility] = useState(false);


    
    useEffect(() => {
      //Fetching all property records when browser is loading
      getPropertyListFromServer();
    }, []);


    const getPropertyListFromServer = async () => {
      //Get all Property list data from server
      try {
        const recordList = await base("Table 1").select({view: "Grid view"}).all();
        const tempArr = [];
        recordList.map((record) => {
          tempArr.push({id: record.id, name: record.fields.name, description: record.fields.description, size: record.fields.size});
        });
        //sort the array on the basis of property ID
        tempArr.sort((obj1, obj2) => obj1.id>obj2.id ? 1 : -1);
        setPropertyList(tempArr);
        } catch (error) {
        console.log(error.message);
      }
    }



    const addItemOnPropertyList = (newItem) => {
        setPropertyList([newItem, ...propertyList]);
        
    }

  

    const removeItemFromPropertyList = async (itemId) => {
      try {
        const record = await base("Table 1").destroy([itemId]);
        if(record.length>0){
          //One record is deleted
          const newList = [...propertyList].filter((itemObj) => itemObj.id != itemId);
          setPropertyList(newList);
        }
      } catch (error) {
        console.log(error.message);
      }
    }





    const addPropertyButtonClick = () => {
      if(formVisibility){
        //if form is visible, Hide the form
        setFormVisibility(false);
      }else{
        //if form is not visible, Show the form
        setFormVisibility(true);
      }
      // getPropertyListFromServer();
    }




    return(
        <>
        <div>
           <div className="home_heading_div">
             <h1 className="home_heading_text">Property Management System</h1>
           </div>
          <div className="home_body_div">
            <Button className="add_property_button" 
              startIcon={formVisibility ? <VisibilityOffIcon style={{color: "white", fontSize: "25px"}}/> : <AddIcon style={{color: "white", fontSize: "25px"}}/> }
             onClick={addPropertyButtonClick} >
             {formVisibility ? "Hide Form" : "Add Property" }
            </Button>
            
          </div>
            {formVisibility ? <PropertyForm addItem = {addItemOnPropertyList} /> : null } 
             {
              propertyList.map((value, index)=> {
                return(<ListItem deleteItem={removeItemFromPropertyList} name={value.name} description={value.description} size={value.size} key={index} id={value.id}  />);
              })
           }
          </div>
        </>
    );
}

export default Home;