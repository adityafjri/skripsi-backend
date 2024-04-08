import neo4j from "neo4j-driver"
import dotenv from "dotenv"

dotenv.config()


const URI = process.env.NEO4J_URI
const USER = process.env.NEO4J_USERNAME
const PASSWORD = process.env.NEO4J_PASSWORD
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
const session = driver.session()


const findAll = async () => {
    const result = await session.run('MATCH (n:UU) RETURN n LIMIT 25;')
    return result.records.map(record => {
        return record.toObject()
    })
}

const findByDst = async (dst) => {
    const query = `
        MATCH p=()-[r:Merevisi]->() WHERE (endNode(r).uuLama = '${dst}') RETURN p LIMIT 25 ;
    
    `
    const result = await session.run(query)
    return result.records.map(record => {

        return record.toObject()
    })
}

const findById = async (id) => {
    const result = await session.run(`
            MATCH (n:UU)
            WHERE n.nomor= '${id}'
            RETURN n LIMIT 25
        `
    )
    return result.records.map(record => {
        return record.toObject()
    })
}

const findByTopic = async (topic) => {
    const result = await session.run(
        //     `
        //     MATCH p=(sourceNode:topik)-[:tentang]->(destinationNode:id)
        //     WHERE sourceNode.tentang =~ '.*${topic}.*'
        //     RETURN p LIMIT 25
        // `
        `
            MATCH (u:UU)-[r:Membahas]->(:Topik)
            WHERE r.tentang =~ ".*${topic}.*"
            RETURN u
        `
    );

    return result.records.map(record => {
        return record.toObject()
    })
}

export default {
    findAll,
    findByDst,
    findById,
    findByTopic
}
