import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ListItem from "../ListItem.vue";

describe("ListItem", () => {
  it("episode title and description", async () => {
    const wrapper = mount(ListItem, {
      props: {
        episode: [
          {
            id: "0",
            name: "EP263｜🦆",
            pubDate: "Wed, 20 Jul 2022 07:52:27 GMT",
            image:
              "https://files.soundon.fm/1601380848736-bce0f26a-745c-4266-aee1-6d4df3479752.jpeg",
          },
          {
            id: "1",
            name: "EP262 | 🌳",
            pubDate: "Sat, 16 Jul 2022 09:51:39 GMT",
            image:
              "https://files.soundon.fm/1601380848736-bce0f26a-745c-4266-aee1-6d4df3479752.jpeg",
          },
        ],
      },
    });
    const content = wrapper.get(".content");
    expect(content.text()).toContain("EP263｜🦆");
    expect(content.text()).toContain("Wed, 20 Jul 2022 07:52:27 GMT");

    const episodeItem = wrapper.get(".wrapper");
    await episodeItem.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("getEpisodeDetail");
    expect(wrapper.emitted()).toHaveProperty("toggleMode");
  });
});
