interface Rss {
  rss: {
    channel: Channel;
  };
}

interface Channel {
  title: string;
  image: { url: string }[];
  item: RawEpisode[];
}

interface RawEpisode {
  id: { __text: string };
  title: string;
  pubDate: string;
  encoded: { __cdata: string };
  enclosure: { _url: string };
  image: { _href: string };
}

interface Episode {
  id: string;
  name: string;
  pubDate: string;
  image: string;
}

interface EpisodeMap {
  id: string;
  name: string;
  encodedDescription: string;
  audio: string;
  image: string;
}

interface Podcast {
  channelName: string;
  channelImage: string;
  episode: Episode[];
  episodeMap: {
    [key: string]: EpisodeMap;
  };
  lastEpisodeId: string;
}

export type { Rss, Channel, RawEpisode, Episode, EpisodeMap, Podcast };
