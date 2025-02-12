import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";


const Location = () =>{
    const [country,setCountry] = useState([]);
    const [selectedCountry,setSelectedCountry] = useState("");
    const [selectedState,setSelectedState] = useState("");
    const [selectedCity,setSelectedCity] = useState("");
    const [states,setStates] = useState([]);
    const [cities,setCities] = useState([]);
    const [showMessage,setShowMessage] = useState("");

    const fetchCountry = async() =>{
        try{
            const response = await fetch("https://crio-location-selector.onrender.com/countries");
            const data = await response.json();
            setCountry(data);
        }catch(error){
            console.error("Error fetching countries:", error)
        }
    }
    const fetchStates = async(countryName) =>{
        try{
            const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`)

            const data = await response.json();
            setStates(data);
        }catch(error){
        console.error("Error fetching states:",error)  
        }
    }
    const fetchCities = async(countryName,stateName) =>{
        try{
            const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`)

            const data = await response.json();
            setCities(data);
        }catch(error){
        console.error("Error fetching cities:",error)  
        }
    }
   
    useEffect(() =>{
        fetchCountry();
    },[]);
  
 
    useEffect(() => {
        if (selectedCountry) {
            fetchStates(selectedCountry);
        }
    }, [selectedCountry]);
    
    useEffect(() => {
        if (selectedState) {
            fetchCities(selectedCountry, selectedState);
        }
    }, [selectedState, selectedCountry]);
    useEffect(() =>{
        if(selectedCountry && selectedState && selectedCity){
            setShowMessage(`You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`)
        }else{
            setShowMessage("")
        }

    },[selectedCountry,selectedState,selectedCity])
  
    const dropdownStyle = {
        padding: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "EEEDEB",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      };

   ``
    return(
        <>
        <h1  className=" text-center text-xl font-medium text-black "style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '70px', margin: '20px'}}>Select Location</h1>
        <div className="container d-flex justify-center align-item-center pt-4 font-low text-xl gap-4">
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
            style={{...dropdownStyle,width:"25%"}}>
            <option value="">Select Country</option>
            {country.map((country) =>(
                <option key={country} value={country}>{country}</option>
            ))}
        </select>
        <select value={selectedState}  onChange={(e) => setSelectedState(e.target.value)}
            style={{...dropdownStyle,width:"13%"}}>
            <option value="">Select State</option>
            {states.map((state) =>(
                <option key={state} value={state}>{state}</option>
            ))}
        </select>
        <select value={selectedCity}  onChange={(e) => setSelectedCity(e.target.value)}
            style={{...dropdownStyle,width:"10%"}}>
            <option value="">Select City</option>
            {cities.map((city) =>(
                <option key={city} value={city}>{city}</option>
            ))}
        </select>
        </div>
        {showMessage ? (
                     <p className="text-center mt-4" style={{ fontSize: "18px" }}>
                     <span style={{ fontWeight: "500" }}>
                       You selected <span style={{ fontSize: "22px" }}>{selectedCity}</span>,
                     </span>{" "}
                     <span className="font-medium"style={{ color: "gray",  fontSize: "18px" }}>{selectedState}</span>,{" "}
                     <span className="font-medium" style={{ color: "gray", fontSize: "18px" }}>{selectedCountry}</span>
                   </p>
            ) : null}
        </>
    )
};
export default Location;

