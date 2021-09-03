import "../css/ListItem.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const ListItem = ({deleteItem, name, description, size, id}) => {

  const deleteIconClick = () => {
    deleteItem(id);
  }

    return(
        <>
          <div className="listitem_root_div">
          <div className="listitem_inner_div">
          <div className="listitem_head_div">
            <div style={{flexGrow: "4"}}>
              <h4>{name}</h4>
            </div>
            <div style={{flexGrow: "4", textAlign: "end"}}>
              <h5>{size}</h5>
            </div>
            <div style={{flexGrow: "1", textAlign: "end"}}>
             <DeleteForeverIcon className="item_delete_icon" onClick={deleteIconClick} />
            </div>
            
          </div>
          <div className="listitem_description_div">
            <p>{description}</p>
          </div>
          </div>
          </div>
        </>
    );
}

export default ListItem;