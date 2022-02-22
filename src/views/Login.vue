<script setup>
import randomString from 'random-string'
import { stringify } from 'query-string'
import { generateRandomString, generateCodeChallenge } from '@/helper'
import { useAuthStore } from '@/store/auth.store'
import { BASE_URL, SPOTIFY_CLIENT_ID } from '@/constants';
import SpotifyLogo from '@/components/SpotifyLogo.vue';

const submit = async () => {

    const state = generateRandomString(16)
    const codeVerifier = generateRandomString(64)
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    const spotifyClientId = SPOTIFY_CLIENT_ID;
    const redirectUri = `${BASE_URL}/callback`
    const responseType = 'code'
    const codeChallengeMethod = 'S256'
    const scope = 'user-read-private user-read-email'

    localStorage.setItem('state', state)
    localStorage.setItem('code_verifier', codeVerifier)

    const requestBody = {
        client_id: spotifyClientId,
        redirect_uri: redirectUri,
        response_type: responseType,
        code_challenge_method: codeChallengeMethod,
        code_challenge: codeChallenge,
        state,
        scope,
    }

    const queryString = stringify(requestBody)

    window.location.href = `https://accounts.spotify.com/authorize?${queryString}`
}

</script>

<template>
    <div class="bg-gray-900 w-full h-screen flex items-center justify-center">
        <button
            type="button"
            class="relative text-green-600 bg-white hover:bg-gray-600 hover:text-white transition-colors px-4 py-3 rounded-md shadow"
            @click="submit"
        >
            <SpotifyLogo class="absolute top-1/2 left-2 transform -translate-y-1/2 w-9 h-9"></SpotifyLogo>
            <span class="pl-9">Login with Spotify</span>
        </button>
    </div>
</template>
