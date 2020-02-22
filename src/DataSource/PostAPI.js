const { RESTDataSource } = require('apollo-datasource-rest') 

class PostAPI extends RESTDataSource{
    
    constructor(){
        super();
        this.baseURL = "https://jsonplaceholder.typicode.com/"
    }

    async getAllPost(){
        const posts = await this.get('posts');
        const postComments = await Promise.all(
            posts.map(async post => await this.getCommentsById(post.id) )
        );
        return this.formatPost(posts, postComments)
    }

    async getCommentsById(postId){
        return await this.get(`posts/${postId}/comments`)
    }

    formatPost(posts, postComments){
        return posts.map((post, index) => ({
            id: post.id,
            title: post.title,
            body: post.body,
            comments: this.formatComment(postComments[index])
        }))
    }

    formatComment(comments){
        return comments.map(comment => ({
            id: comment.id,
            name: comment.name,
            email: comment.email,
            body: comment.body
        }))
    }

}
module.exports = PostAPI;
