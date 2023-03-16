import { useEffect, useState } from 'react';

const searchForAll = 'http://localhost:3000/api';

function App() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('...');
  const [dataList, setDataList] = useState([]);
  const dataArray = [];

  useEffect(() => {
    getAllTheData();
  }, [])

  const getAllTheData = () => {
    fetch(searchForAll, {
      mode: "cors"
    })
    .then(res => res.json())
    .then(
            data => {
            data.map(response => {
              if (response.name.common !== undefined & response.capital !== undefined) {
                dataArray.push(response);
              }
              else {
                console.log("Could not get the capital city of " + response.name.common)
              }
            })
            setDataList(dataArray);
            setCity(dataArray[0].capital)
          }
    )
  }

  useEffect(() => {
    dataList.map(
      data => {
        if(data.name.common == country) {
          setCity(data.capital)
        }
        return country
       }
      )
      
  }, [country]);

  function changeCountry (e) {
    setCountry(e.target.value)
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>The capital city of</div>
          <select onChange={e => changeCountry(e)}>
            {dataList.map((resp) => {
              return [
                      <option key = {resp.name.common}value={resp.name.common}>{resp.name.common}</option> 
                    ]
            }
            )}
          </select>
        <div>is {city}</div>
      </header>
    </div>
  );
}

export default App;

