<template>
    <div class="ui middle aligned center aligned grid container three column">
        <div class="column">
            <form class="ui large form">
                <div class="ui stacked secondary segment">
                    <div class="field">
                        <div class="ui left icon input large">
                            <i class="user icon"></i>
                            <input
                                    type="text"
                                    name="email"
                                    placeholder="E-mail address"
                                    v-model="email"
                            />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input large">
                            <i class="lock icon"></i>
                            <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    v-model="password"
                                    autocomplete="off"
                            />
                        </div>
                    </div>
                    <div class="ui fluid large teal submit button" @click="loginButtonPressed">Login</div>
                </div>
                <div class="ui error message"></div>
            </form>
            <button class="ui red fluid large google submit button" @click="socialLogin">
                <i class="google plus icon"></i>
                Google Plus
            </button>

            <div class="ui message">
                Don't have an account?
                <router-link :to="{ name: 'register' }">Register</router-link>
                <!-- <button @click="signOut">SignOut</button> -->
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
        methods: {
            async loginButtonPressed() {
                if (this.email === '' || this.password === '') {
                    return false;
                }
                try {
                    const {
                        user
                    } = await firebase
                        .auth()
                        .signInWithEmailAndPassword(this.email, this.password)
                        .then(response => {
                            localStorage.setItem('auth_token', response['user']['xa']);
                            this.$router.push('/home');
                        });
                } catch (error) {
                    console.log(error);
                }
            },
            socialLogin() {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then((response) => {
                    localStorage.setItem('auth_token', response['user']['xa']);
                    this.$router.push('/home');
                }).catch((err) => {
                    alert('Oops. ', err.message);
                })
            }
        }
    };
</script>
