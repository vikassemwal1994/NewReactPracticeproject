import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [slots, setSlots] = useState([]);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    fetch('https://dummy.restapiexample.com/api/v1/employees')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('response', data.data);
        convertDataInPagination(data.data)
      })
      .catch((error) => {
        console.error('There was a problem fetching the data:', error);
      });
  }, []);

  const convertDataInPagination = (employees) => {
    let arrayOfPages = []
    
    let lengthOfArray = employees.length
    let slots = Math.ceil(lengthOfArray/10)
    let startingIndex = 0

    for(let i = 0; i<slots; i++){
      let slot = employees.slice(startingIndex, startingIndex+10)
      startingIndex = startingIndex+10
      arrayOfPages.push(slot)
    }
    console.log("pages array", arrayOfPages)
    setSlots(arrayOfPages)
    setPageData(arrayOfPages[0])
  }

  const convertDataWithOtherAproach = (employees)  => {

  }
 

  return (
    <div className="App">
     <ul>
     {pageData.map((item)=>{
      return <li>
        <p>{item.employee_name}</p>
      </li>
     })}
     </ul>
     {slots.map((item, index)=>{
      return <button onClick={()=>{
        console.log("item", item)
        setPageData(item)
      }}>{index+1}</button>
     })}
     
    </div>
  );
}

export default App;
