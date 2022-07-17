import axios from "axios";
import x2js from "x2js";

import type { Rss, Episode, EpisodeMap, Podcast } from "@/interfaces/index";

const parser = new x2js();

const getRssData = async () => {
  try {
    const res = await axios.get(
      "https://feeds.soundon.fm/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml"
    );
    const jsonData: Rss = parser.xml2js(res.data);
    const { title: channelName, image, item } = jsonData.rss.channel;

    const episode: Episode[] = item.map((ep) => ({
      id: ep.id.__text,
      name: ep.title,
      pubDate: ep.pubDate,
      image: ep.image._href,
    }));

    const episodeMap = item.reduce(
      (acc, ep) => ({
        ...acc,
        [ep.id.__text]: {
          id: ep.id.__text,
          name: ep.title,
          encodedDescription: ep.encoded.__cdata,
          audio: ep.enclosure._url,
          image: ep.image._href,
        },
      }),
      {} as {
        [key: string]: EpisodeMap;
      }
    );

    const podcast: Podcast = {
      channelName,
      channelImage: image[0].url,
      episode,
      episodeMap,
    };

    return podcast;
  } catch (err) {
    console.log(err);
  }
};

export { getRssData };
