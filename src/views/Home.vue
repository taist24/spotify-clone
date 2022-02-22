<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import SpotifyIcon from '@/components/SpotifyIcon.vue';
import { useAuthStore } from '../store/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const headerOpacityClass = ref('opacity-0')
const activeSidebarLink = ref('home')

const sidebarLinks = ref([
    { id: 'home', name: 'Home', icon: 'house' },
    { id: 'search', name: 'Search', icon: 'search' },
    { id: 'library', name: 'Library', icon: 'book' },
])

const playlists = ref([
    { id: 1, name: 'Anime Lofi & Chill' },
    { id: 2, name: 'Synthwave' },
    { id: 3, name: 'Hate Story 4' },
])

const dropdown = ref(false);
const toggleDropdown = () => {
    dropdown.value = !dropdown.value
}

const logOut = () => {
    authStore.logOut()
    router.push({ name: 'login' })
}

const handleScrollEvent = (e) => {
    if (window.scrollY > 0) {
        headerOpacityClass.value = 'opacity-1'
    } else {
        headerOpacityClass.value = 'opacity-0'
    }
}

onMounted(() => {
    // window.addEventListener('scroll', handleScrollEvent)
})

onBeforeUnmount(() => {
    // window.removeEventListener('scroll', handleScrollEvent)
})

</script>

<template>
    <div class="bg-gray-900 h-screen home-layout">
        <!-- header -->
        <header class="z-20 w-full flex items-center justify-between h-16 px-8 main-view">
            <div
                class="absolute z-[-1] inset-0 overflow-hidden bg-black transition-opacity"
                :class="headerOpacityClass"
            ></div>
            <div class="space-x-4">
                <button type="button" class="bg-black rounded-full p-1 inline-flex">
                    <fa icon="angle-left" class="text-white h-6 w-6"></fa>
                </button>
                <button type="button" class="bg-black rounded-full p-1 inline-flex">
                    <fa icon="angle-right" class="text-gray-500 h-6 w-6"></fa>
                </button>
            </div>
            <!-- user dropdown -->
            <button type="button" @click.prevent="toggleDropdown">
                <div
                    class="rounded-full p-1 text-white flex items-center space-x-2"
                    :class="{ 'bg-black': !dropdown, 'bg-gray-800': dropdown }"
                >
                    <div
                        class="rounded-full p-1 w-6 h-6 flex items-center justify-center bg-gray-500"
                    >
                        <fa icon="user" class="w-4 h-4"></fa>
                    </div>
                    <span class="text-sm">Zozo</span>
                    <fa icon="sort-down" size="sm" v-if="!dropdown"></fa>
                    <fa icon="sort-up" size="sm" v-else></fa>
                </div>
            </button>
            <ul
                class="absolute bottom-auto top-0 right-0 left-auto transform -translate-x-8 translate-y-14 rounded bg-gray-800 shadow w-48 text-gray-300 text-sm p-1"
                v-show="dropdown"
            >
                <li class="p-2 cursor-pointer hover:bg-gray-700 rounded">Profile</li>
                <li class="p-2 cursor-pointer hover:bg-gray-700 rounded" @click="logOut">Log out</li>
            </ul>
        </header>
        <!-- sidebar -->
        <aside class="w-60 bg-black h-full flex-none sidebar">
            <!-- logo -->
            <a href="/" class="p-6 block">
                <SpotifyIcon class="filter brightness-0 invert" />
            </a>
            <ul class="font-semibold mx-2 mb-4 space-y-1">
                <li
                    role="button"
                    :class="`py-2 px-6 rounded ${activeSidebarLink === sidebarLink.id ? 'text-white' : 'text-gray-400'}`"
                    v-for="sidebarLink in sidebarLinks"
                    @click="activeSidebarLink = sidebarLink.id"
                >
                    <a href="#" class="flex items-center">
                        <fa :icon="sidebarLink.icon" class="mr-3 w-6 h-6" />
                        <span class="text-sm">{{ sidebarLink.name }}</span>
                    </a>
                </li>
            </ul>
            <ul class="font-semibold mx-2 mb-4 space-y-1">
                <li class="py-2 px-6 rounded text-gray-400">
                    <a href="#" class="flex items-center">
                        <button type="button" class="mr-3 p-1 bg-gray-300 flex items-center">
                            <fa icon="plus" class="text-gray-700 w-4 h-4"></fa>
                        </button>
                        <span class="text-sm">Create Playlist</span>
                    </a>
                </li>
                <li class="py-2 px-6 rounded text-gray-400">
                    <a href="#" class="flex items-center">
                        <button
                            type="button"
                            class="mr-3 p-1 from-blue-900 via-blue-700 to-white bg-gradient-to-br flex items-center"
                        >
                            <fa icon="heart" class="text-gray-300 w-4 h-4"></fa>
                        </button>
                        <span class="text-sm">Liked songs</span>
                    </a>
                </li>
            </ul>
            <div class="h-px w-10/12 mx-auto bg-gray-800"></div>
            <ul class="mx-2 py-2 h-24">
                <li
                    class="text-gray-400 text-sm py-1 px-6"
                    v-for="playlist in playlists"
                    :key="playlist.id"
                >{{ playlist.name }}</li>
            </ul>
        </aside>
        <!-- player -->
        <div class="w-full bg-lime-50 now-playing-bar" style="height: 12vh;"></div>
        <!-- main content -->
        <main class="flex w-full h-full relative main-view min-h-0">
            <div class="bg-gray-900 pt-20 px-8 pb-6 text-white">
                <section>
                    <p class="font-bold text-2xl mb-6">Recently Played</p>
                    <article
                        class="p-4 w-48 h-auto rounded bg-gray-800 hover:bg-gray-700 space-y-2 transition"
                    >
                        <img
                            src="https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebb19af0ea736c6228d6eb539c/1/en/default"
                            alt="post"
                            class="rounded"
                        />
                        <p class="font-semibold text-sm">Daily Mix 1</p>
                        <p
                            class="text-xs text-gray-500"
                        >A.R. Rahman, Pritam, Vishal-Shekhar and more</p>
                    </article>
                </section>
                <section>
                    <p class="font-bold text-2xl mb-6">Recently Played</p>
                    <article
                        class="p-4 w-48 h-auto rounded bg-gray-800 hover:bg-gray-700 space-y-2 transition"
                    >
                        <img
                            src="https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebb19af0ea736c6228d6eb539c/1/en/default"
                            alt="post"
                            class="rounded"
                        />
                        <p class="font-semibold text-sm">Daily Mix 1</p>
                        <p
                            class="text-xs text-gray-500"
                        >A.R. Rahman, Pritam, Vishal-Shekhar and more</p>
                    </article>
                </section>
                <section>
                    <p class="font-bold text-2xl mb-6">Recently Played</p>
                    <article
                        class="p-4 w-48 h-auto rounded bg-gray-800 hover:bg-gray-700 space-y-2 transition"
                    >
                        <img
                            src="https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebb19af0ea736c6228d6eb539c/1/en/default"
                            alt="post"
                            class="rounded"
                        />
                        <p class="font-semibold text-sm">Daily Mix 1</p>
                        <p
                            class="text-xs text-gray-500"
                        >A.R. Rahman, Pritam, Vishal-Shekhar and more</p>
                    </article>
                </section>
            </div>
        </main>
    </div>
</template>
