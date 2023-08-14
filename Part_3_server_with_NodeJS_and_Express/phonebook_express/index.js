const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

//use the variables defined in utils/config
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})