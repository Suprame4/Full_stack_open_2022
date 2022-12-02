//create components: Header, Content, Total
function Header(props){
    return <h1>{props.course}</h1>

}

//Create a Render component
function Part(props){
    return <p>{props.part} {props.exercise}</p>
}


/*function Content(props){
    return (
        <div>
        <Part part={part1} exercise={exercises1}/>
        <Part part={part2} exercise={exercises2}/>
        <Part part={part3} exercise={exercises2}/>
      </div>
     )
}*/

function Total(props){
    return <p>Number of exercise {props.exercises1 + props.exercises2 + props.exercises3}</p>
}

//export the components 
export {Header, Part, Total}