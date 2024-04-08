(async () => {
    var neo4j = require('neo4j-driver')
    require('dotenv').config({
      path: 'Neo4j-6b88ee23-Created-2024-02-27.txt',
      debug: true  // to raise file/parsing errors
    })
  
    const URI = process.env.NEO4J_URI
    const USER = process.env.NEO4J_USERNAME
    const PASSWORD = process.env.NEO4J_PASSWORD
    let driver
  
    try {
      driver = neo4j.driver(URI,  neo4j.auth.basic(USER, PASSWORD))
      const serverInfo = await driver.getServerInfo()
      console.log('Connection estabilished')
      console.log(serverInfo)
    } catch(err) {
      console.log(`Connection error\n${err}\nCause: ${err.cause}`)
      await driver.close()
      return
    }
  
    // Use the driver to run queries
  
    await driver.close()
  })();