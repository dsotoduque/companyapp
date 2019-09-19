<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Companies Management</h1>
    <p>In this page you can to manage the companies registered</p>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
        <b-col>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Company Website</th>
                        <th>Company Logo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="company in companies" :key="company.id">
                        <td>{{company.id}}</td>
                        <td>{{company.name}}</td>
                        <td>{{company.website}}</td>
                        <td>{{company.logo}}</td>
                        <td class="text-right">
                            <a href="#" @click.prevent="populateCompanyEdit(company)">Edit</a>
                            <a href="#" @click.prevent="deleteCompany(company.id)">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </b-col>

    </b-row>
  </div>
</template>
<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      posts: [],
      model: {}
    }
  },
  async created () {
    this.refreshPosts()
  },
  methods: {
    async refreshPosts () {
      this.loading = true
      this.companies = await api.getCompanies()
      this.loading = false
    },
    async populatePostToEdit (post) {
      this.model = Object.assign({}, post)
    },
    async savePost () {
      if (this.model.id) {
        await api.updatePost(this.model.id, this.model)
      } else {
        await api.createPost(this.model)
      }
      this.model = {} // reset form
      await this.refreshPosts()
    },
    async deletePost (id) {
      if (confirm('Are you sure you want to delete this post?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deletePost(id)
        await this.refreshPosts()
      }
    }
  }
}
</script>