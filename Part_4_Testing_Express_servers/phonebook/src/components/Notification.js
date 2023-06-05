const Notification = ({message, infoMessage}) => {
    
    if (message == null && infoMessage == null){
        return null
    }
    else if (infoMessage != null) {
        return (
            <div className="error">
                {infoMessage}
            </div>
        )

    }
    else {

        return (
            <div className='success'>
                {message}
            </div>
        )
    }
}

export default Notification