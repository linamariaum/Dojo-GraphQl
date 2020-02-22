const { ApolloServer } = require("apollo-server")

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const PostApi = require('./DataSource/PostAPI')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => new PostApi()
})

server.listen().then(({ url}) => {
    console.log(`Server ready at ${url}`) //formatea la url como string

})