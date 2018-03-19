<template>
	<div>
		<ul>
			<li v-for="folder in folders" :key="folder.link"><router-link :to="folder.link">{{folder.name}}</router-link></li>
		</ul>
		<div v-if="image" class="cover">
			<img :src="image">
		</div>
		<div v-if="description" class="description">
			<pre>
{{description}}
			</pre>
		</div>
		<div v-if="songs && songs.length" class="player">
			<aplayer autoplay :music="songs[0]" :list="songs" mode="order"></aplayer>
		</div>
	</div>
</template>

<script>
import Aplayer from "vue-aplayer";

import Listing from "@/services/listing";

export default {
  components: {
    Aplayer
  },
  data() {
    return {
      description: undefined,
      folders: [],
      songs: []
    };
  },
  watch: {
    $route: function() {
      this.UpdateListing();
    }
  },
  async mounted() {
    this.UpdateListing();
  },
  methods: {
    async UpdateListing() {
      const list = await Listing.GetDirectoryListing(this.$route.path);
      this.folders = list.folders;
			this.description = list.description;
			this.image = list.image;
      if (list.songs) {
        this.songs = list.songs.map(song => {
          return {
            url: song.link,
            title: song.name,
            pic: list.image
          };
        });
      } else {
        this.songs = [];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player {
  width: 500px;
	margin: 0px auto;
}
</style>
