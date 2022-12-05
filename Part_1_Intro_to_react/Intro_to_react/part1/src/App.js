import {Header, Part, Total} from './comps.js'


const App = () => {
  //define the content into an object
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Content = () => {
    return (
      <div>
        <Part part={course.parts[0].name} exercise={course.parts[0].exercises}/>
        <Part part={course.parts[1].name} exercise={course.parts[1].exercises}/>
        <Part part={course.parts[2].name} exercise={course.parts[2].exercises}/>
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content />
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
    </div>
  )
}

export default App