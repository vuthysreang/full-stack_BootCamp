<template>
  <div id="home">
    <div class="row center">
      <div class=" s12">
        <!-- Post Todo form -->
        <PostForm @postCreated="addPost" :editingPost="editingPost"/>
      </div>
    </div>
    <div class="row">
      <div
        class="col s6"
        v-for="(post, index) in posts"
        v-bind:item="post"
        :index="index"
        :key="post.id"
      >
        <div class="card">
          <div class="card-content">
            <p class="card-title">{{ post.title }}</p>
            <p class="timestamp">{{ post.createdAt | formatDate }}</p>
            <p>{{ post.body }}</p>
          </div>
          <div class="card-action">
            <a href="#" @click="editPost(post)">Edit</a>
            <a href="#" class="delete-btn" @click="deletePost(post.id)">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import APIService from "../APIService";
import PostForm from "../components/PostForm";
const postService = new APIService();

export default {
  name: "Home",
  components: {
    PostForm
  },
  data() {
    return {
      posts: [],
      editingPost: null
    };
  },
  methods: {
    addPost(post) {
      if (this.posts.find(p => p.id === post.id)) {
        const index = this.posts.findIndex(p => p.id === post.id);
        this.posts.splice(index, 1, post);
      } else this.posts.unshift(post);
    },
    editPost(post) {
      this.editingPost = post;
    },
    deletePost(id) {
      postService
        .deletePost(id)
        .then(() => {
          this.posts = this.posts.filter(p => p.id !== id);
        })
        .catch(err => console.error(err));
    },
  },
  created() {
    postService
      .getAllPosts()
      .then(res => {
        this.posts = res.data;
        console.log(this.posts);
      })
      .catch(err => console.error(err));
  },
  filters: {
    formatDate(date) {
      date = new Date(date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }
  }
};
</script>

<style scoped>
#home {
  background-color: rgb(17, 129, 204);
}
.center {
  width: 50%;
}

.card .card-content .card-title {
  margin-bottom: 0;
  font-weight: 450;
}
.card .card-content p.timestamp {
  color: #999;
  margin-bottom: 10px;
}
.delete-btn {
  color: red !important;
}
</style>
