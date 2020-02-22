module.exports = {
    Query: {
        posts: (_, __, {dataSources}) => {dataSources.PostsAPI.getAllPost()}
    }

}