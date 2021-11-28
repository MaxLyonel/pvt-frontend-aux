<template>
<div > 
    <header>
        <nuxt-link to="/"> Regresar </nuxt-link>
        <h1 class="title"> {{ album.title }} </h1>
    </header>

    <div >
        <div v-for="photo in photos" :key="photo.id">
            <img :src="photo.url" :alt="photo.title">
        </div>
    </div>
</div>
</template>

<script>
import router from 'vue-router'
import axios from 'axios'

import env from '../../config/env'

export default {
    name: 'AlbumIndvPage',
    data() {
        return {
            album: Object,
            photos: []
        }
    },
    created: async function() {
        let albumid = this.$route.params.id
        
        let albumRes = await axios.get(`${env.endpoint}/albums/${albumid}`)
        this.album = albumRes.data

        let photosRes = await axios.get(`${env.endpoint}/albums/${albumid}/photos`)
        this.photos = photosRes.data
    }
}
</script>

<style scoped>
.container { text-align: center }
header { 
    margin-top: 100px; 
    margin-bottom: 100px;
}
</style>
