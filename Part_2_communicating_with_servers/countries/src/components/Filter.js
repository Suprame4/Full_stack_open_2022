const Filter = ({search, handleSearchChange}) => {
    return (
        <form>
            <div>
                find countries <input value={search} onChange={handleSearchChange}/>
            </div>
        </form>
    )
}

export default Filter 