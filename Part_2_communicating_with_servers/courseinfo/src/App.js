const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b>Total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />
    <Part
      part={parts[3]} 
    />        
  </>

const Content2 = ({ parts }) => 
<>
  <Part
    part={parts[0]} 
  />
  <Part
    part={parts[1]} 
  />       
</>

  const Course = (props) => {
    //declare the course and parts variables 
    //const {course} = props.course
    //const {t} = props.sum
    console.log("testing...", props.sum)
    

    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total sum={props.sum} /> 

      </div>
    )
  }

  const Course2 = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content2 parts={props.course.parts} />
        <Total sum={props.sum} /> 
      </div>
    )
  }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  const t = courses[0].parts.reduce((s, p) => {
    console.log('what is happening', s, p.exercises)
    return s + p.exercises 
  }, 0)

  const t2 = courses[1].parts.reduce((s, p) => {
    console.log('what is happening', s, p.exercises)
    return s + p.exercises 
  }, 0)

  return (
    <div>
    <h1>Web development curriculum</h1>
    <Course course={courses[0]} sum={t} />
    <Course2 course={courses[1]} sum={t2}/>
    </div>
  
  )
}

export default App
