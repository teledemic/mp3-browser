<template>
	<div>
		<div class="folder-list">
			<div v-for="folder in folders" :key="folder.link" class="folder-item"><router-link :to="folder.link">{{folder.name}}</router-link></div>
		</div>
		<table class="song-player">
			<tr>
				<td v-if="image" class="side-image">
					<img :src="image">
				</td>
				<td>
          <pre v-if="description">{{description}}</pre>
					<div v-if="songs && songs.length" class="player">
						<aplayer autoplay :music="songs[0]" :list="songs" mode="order"></aplayer>
					</div>
				</td>
			</tr>
		</table>
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
      image: undefined,
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
      if (this.$route.path === "/") {
        document.title = "FundamentalFrequency Jams";
      } else {
        let title = unescape(this.$route.path.replace(/^\/+|\/+$/g, ""));
        document.title = "FF Jams - " + title;
      }
      const list = await Listing.GetDirectoryListing(this.$route.path);
      this.folders = list.folders;
      this.description = list.description;
      this.image = list.image;
      if (list.songs) {
        this.songs = list.songs.map(song => {
          return {
            url: song.link,
            title: song.name,
            pic: list.image || "/images/noart.jpg"
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
<style>
.folder-list {
  font-size: 12px;
}
.folder-item {
  padding: 2px;
  flex-basis: 20%;
}
.player {
  width: 500px;
  margin: 20px auto;
  margin-top: 50px;
}
table.song-player {
  margin: 0 auto;
  width: 100%;
}
.aplayer-author {
  display: none;
}
.aplayer-list {
  text-align: left;
}
.aplayer-list-index {
  display: none;
}
.aplayer-list-author {
  display: none;
}
@media (max-width: 1026px) {
  .side-image {
    display: none;
  }
  .player {
    width: 90%;
  }
}
</style>
