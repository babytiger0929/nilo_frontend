<template>
    <section>
        <div class="ui middle aligned center aligned grid">
            <div class="column">
                <h1>Reader</h1>
                <p v-if="user">Reader:{{user.email}}</p>
                <button class="ui pink submit button" @click="signout">Signout</button>
            </div>
        </div>
        <div>
            <p>{{error}}</p>
        </div>
        <div>
            <h1>Articles</h1>
            <table class="ui celled table">
                <tr v-for="article in articles" :key="article.id">
                    <td>{{article.title}}</td>
                    <td>{{article.content}}</td>
                </tr>
            </table>
        </div>
    </section>
</template>
<script>
    import firebase from "firebase";
    import axios from 'axios';
    export default {
        data() {
            return {
                user: null,
                articles: [],
                error: ''
            };
        },
        created() {
            var self = this;
            firebase.auth().onAuthStateChanged(function(user) {
                self.user = user;
            });
            let token = localStorage.getItem('auth_token');
            if (token) {
                axios.get('http://192.168.0.119:8000/api/article', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                    .then(response => {
                        this.articles = response.data['article']
                    })
                    .catch(e => {
                        this.error = e
                    })
            } else {

            }
        },
        methods: {
            signout() {
                firebase
                    .auth()
                    .signOut()
                    .then(user => {
                        // this.$store.commit("setUser", null);
                        localStorage.removeItem('auth_token');
                        this.$router.push("/login");
                    });
            }
        }
    };
</script>