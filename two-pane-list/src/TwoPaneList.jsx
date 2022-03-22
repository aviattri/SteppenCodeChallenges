import { useState } from "react";

export const TwoPaneList = ({ data }) => {
  console.log(data[0]);
  const [item, setItem] = useState()
  return (<>
        <div class="columns" >
           <div class="column is-primary has-background-primary-light">
           <div class="buttons">
              {data.map((element)=> {
                    return <button class="button" onClick={()=>setItem(element)}>
                              {element.title}
                          </button>
                  })
              }
             </div>
          </div>
          <div class="column is-secondary has-background-link-light">
             <div class="content">
               {
                  item ? item.content.map((info)=> {return <p>{info}</p>}) : "Please click on a Title in the left pane to check its content"
               }
             </div>
          </div>
        </div>
      </>);
}
