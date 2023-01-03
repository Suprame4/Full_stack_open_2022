
const Countries = ({countries, search}) => {

    const result = countries.filter(
        country => country.name.toString().toLowerCase().includes(
            search.toLowerCase())).length
        
    console.log("Check results: ", result < 10)

    //create conditional statements 
    if( result > 10) {
        return (
            <div>
                <Note name={"Too many matches, please specify another filter"}/>
            </div>
        )
    } else if (result < 10 && result > 1){
        return(
            <div>
                {
                    countries.fitler(
                        country => country.name.toString().toLowerCase().includes(
                            search.toLowerCase()))
                    .map(country => <Note key={country.name} name={country.name}/>)
                }
            </div>
        )
    } else if ( result == 1){
        
        return (
            <div>
                {
                    countries.filter(
                        country => country.name.toString().toLowerCase().includes(
                            search.toLowerCase()))
                    .map(country => <Country key={country.name} country={country}/>)
                }
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

const Country = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital} <br/>
                area {country.area}    
            </p>
            <h3>languages:</h3>
                <ul>
                    {country.languages.map(language => 
                        <Language key={language.name} name={language.name}/>
                        )}
                </ul>
            
            <img src={country.flag} alt={country.flag} width={120}/>
        </div>
    )
}

export default Countries