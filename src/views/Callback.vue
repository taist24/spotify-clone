<script setup>
import axios from 'axios'
import * as moment from 'moment'
import { stringify } from 'query-string'
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store';
import { BASE_URL, SPOTIFY_CLIENT_ID } from '../constants';

const router = useRouter()
const authStore = useAuthStore()
const { code, state } = router.currentRoute.value.query

if (localStorage.getItem('state') !== state) {
    router.push({ name: 'login' })
} else {
    const clientId = SPOTIFY_CLIENT_ID;
    const codeVerifier = localStorage.getItem('code_verifier')
    const redirectUri = BASE_URL + '/callback'
    const grantType = 'authorization_code'

    const queryString = stringify({
        code,
        client_id: clientId,
        code_verifier: codeVerifier,
        grant_type: grantType,
        redirect_uri: redirectUri
    })

    axios.post('https://accounts.spotify.com/api/token', queryString, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Accept': 'application/json',
        }
    }).then(({ data }) => {
        localStorage.clear()
        authStore.authentication = data
        authStore.authentication.expires_in = moment().add(authStore.authentication.expires_in, 'seconds').unix()
        router.push({ name: 'home' })
    }).catch((err) => {
        router.push({
            name: 'login', query: {
                error: 'Oops! Something went wrong'
            }
        })
    })
}
</script>

<template></template>
