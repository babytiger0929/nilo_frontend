<template>
    <div class="ui middle aligned center aligned grid container three column">
        <div class="column">
            <h1>Create an Account</h1>
            <form class="ui large form">
                <div class="ui stacked secondary segment">
                    <div class="field">
                        <div class="ui left icon input large">
                            <i class="mail icon"></i>
                            <input type="text" name="email" placeholder="E-mail address" v-model="email" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input large">
                            <i class="lock icon"></i>
                            <input type="password" name="password" placeholder="Password" autocomplete="off" v-model="password" />
                        </div>
                    </div>
                    <div class="ui fluid large pink submit button" @click="registerButtonPressed">Register</div>
                </div>
                <div class="ui error message"></div>
            </form>
            <div class="ui message">
                Have an account already?
                <router-link :to="{ name: 'login' }">Login</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from "firebase";
    export default {
        data() {
            return {
                email: "",
                password: ""
            };
        },
        mounted() {
            // this.hideLoader();
        },
        methods: {
            async registerButtonPressed() {
                try {
                    var {
                        user
                    } = await firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.email, this.password);
                    // signout
                    firebase
                        .auth()
                        .signOut()
                        .then(user => {
                            this.$router.push("/login");
                        });
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    };
</script>