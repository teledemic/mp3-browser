import axios from "axios";
import cheerio from "cheerio";

const ROOT_PATH = "http://fundamentalfrequency.com/jams";

export default class Listing {
	static async GetDirectoryListing(path) {
		const response = await axios.get(ROOT_PATH + path);
		const parsed = cheerio.load(response.data);
		const description = parsed("pre").text();
		const links = parsed("li a");
		let folders = [];
		let songs = [];
		let image;
		links.each((index, link) => {
			const href = link.attribs.href;
			if (href.startsWith("/")) {
				// Skip parent link
			} else if (href.endsWith(".jpg")) {
				image = href;
			} else if (href.endsWith("/")) {
				folders.push({
					name: unescape(href.slice(0, -1)),
					link: href,
				});
			} else if (href.endsWith(".mp3")) {
				songs.push({
					name: unescape(href.slice(0, -4)),
					link: ROOT_PATH + path + href,
				});
			}
		});
		return {
			description,
			folders,
			songs,
			image,
		};
	}
}
