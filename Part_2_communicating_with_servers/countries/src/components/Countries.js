
const Countries = ({countries, search}) => {

    /*const result2 = countries.filter(
        country => country.name.toString().toLowerCase().includes(
            search.toLowerCase())).length*/
  
    const result = countries.map(e => e.name.common)
        .filter(e => e.toLowerCase().includes(search.toLowerCase()))
        .sort() 

    console.log("Check results: ", result.length < 10)
    console.log("Check 2:", typeof(countries))

    //create conditional statements 
    if( result.length > 10) {
        return (
            <div>
                <Note name={"Too many matches, please specify another filter"}/>
            </div>
        )
    } else if (result.length < 10 && result.length > 1){
        return(

            <div>
                {result.map((e, i) => <div key={i}>{e}</div>)}
            </div>

        )
    } else if ( result.length == 1){
        
        const oneCountry = countries[countries.findIndex(e => e.name.common === result.toString())]
            
        return (
            
            <div>
                <br/><h1>{result}</h1><br/>
                <p>
                    capital {oneCountry.capital} <br/>
                    area {oneCountry.area} <br/>
                </p>
                <h3>languages: </h3>
                {Object.values(oneCountry.languages).map((e, i) => <li key={i}> {e}</li>)} <br/>
            
                <img src={oneCountry.flags.png} alt={oneCountry.flags} width={120}/>
            </div>

        )
    } else {
        return (
            <div>
                <Note name={"Nothing found"}/>
            </div>
        )
    }
}

const Note = ({name}) => {
    return (
        <div>
            {name}
        </div>
    )
}

const Language = ({ name }) => {
    return (
        <li>{name}</li>
    )
}


export default Countries