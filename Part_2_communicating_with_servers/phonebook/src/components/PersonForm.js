const PersonForm = ({onSubmit, nameValue, onChangeName, numberValue, onChangeNumber}) => (
        
        <form onSubmit={onSubmit}>
          <div>
            name: 
            <input 
              value={nameValue}
              onChange={onChangeName}
            />
          </div>
          <div>
            number: 
            <input 
              value={numberValue}
              onChange={onChangeNumber}
            />
          </div>
          <button type="submit">
          add
          </button>

      </form>
    ) 

export default PersonForm