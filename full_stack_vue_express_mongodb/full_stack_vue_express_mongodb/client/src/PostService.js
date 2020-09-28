
import axios from 'axios';


const url = 'api/taskslist/';

class PostService{
    // Get Tasks
    static getPosts(){
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        dateCreated: new Date(post.dateCreated)
                    }))
                )
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    // Create Tasks
    static insertPost(task){
        return axios.post(url, {
            task
        });
    }

    // Delete Task
    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;