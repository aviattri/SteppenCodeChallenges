import { useState } from "react"

export const ItemList = ({ data }) => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState({id:null});
  const [focus,setFocus] = useState({});

  const addItem = (e, value) => {
    e.preventDefault();
    setList(list =>[...list, value]);
    setInput("");
  }

  const editItem = (e, value, newValue) => {
     const updatedList = [...list];
     updatedList[updatedList.indexOf(value)] = newValue;
     setList(updatedList);
   }

  const removeItem = (index) => {
    const updatedList = [...list]
    updatedList.splice(index,1);
    setList(updatedList);
    setShowModal(false);
  }

  const Modal = ({item, index}) => {
    const active = showModal ? "is-active" : "";
    return (
          <div className={`modal ${active}`}>
            <div className="modal-background" />
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">{`Are you sure you want to remove ${item}`}</p>
              </header>
              <footer className="modal-card-foot">
                <button onClick={()=>removeItem(index)} className="button is-success">
                  Confirm Delete
                </button>
                <button onClick={()=>setShowModal(!showModal)} className="button">
                  Cancel
                </button>
              </footer>
            </div>
          </div>
     )
  }

  const EditItemField = (value) =>{
    let newVal = "" ;
    return (
      <div class="field is-grouped">
        <form class="control is-grouped" onSubmit={(e)=>{return editItem(e, value.item, newVal), setEdit({id:null})}}>
          <input 
            onChange={(event)=> newVal = event.target.value} 
            class="input" 
            type="text" 
            placeholder={value.item}/>
        </form>
      </div>
    );
  }

  const AddItemField = ()=> {
    return (
      <div class="field is-grouped">
        <form class="control is-expanded" onSubmit={(e)=>addItem(e, input)}>
          <input 
            value={input} 
            onChange={(event)=>setInput(event.target.value)} 
            class="input" 
            type="text" 
            placeholder="Add item"/>
        </form>
        <p class="control">
            <button onClick={(e)=> addItem(e, input)} class="button is-info">Add</button>
        </p>
      </div>
    );
  }

  const ListRowItem = ({item, index}) => {
    return (
      <>
      {edit.id == index ? <EditItemField item={item}/> :
        (<div class="columns" key={index}>
          {showModal && <Modal item={focus.item} index={focus.index}/>}
          <div class="column is-3">
            <p onMouseOver={()=>setFocus({hover:index, item:item, index: index})} onMouseOut={()=>setFocus({})}>
              {item}
            </p>
          </div>   
          {focus.hover == index && 
            <> 
              <div class="column is-1">
                <button onClick={()=> setShowModal(!showModal)} class="button is-danger">Delete</button>
              </div>
              <div class="column is-1">
                <button onClick={()=> setEdit({id:index})} class="button is-primary">Edit</button>
              </div>
            </>
          }
      </div>)} 
      </>
    );
  }

  return (
    <>
      <div className="content">
          {list.map((item, index)=> {
              return <ListRowItem key={index} item={item} index={index}/>} 
          )}
      </div>
      {AddItemField()}
  </>
  );
}
