import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HeaderItem from "../HeaderItem.vue";

describe("HeaderItem", () => {
  it("mode: channel", () => {
    const wrapper = mount(HeaderItem, {
      props: {
        headerData: {
          image:
            "https://files.soundon.fm/1601380848736-bce0f26a-745c-4266-aee1-6d4df3479752.jpeg",
          mode: "channel",
          name: "Gooaye 股癌",
        },
      },
    });
    const title = wrapper.get(".title");
    expect(title.text()).toContain("Gooaye 股癌");
    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("mode: episode", () => {
    const wrapper = mount(HeaderItem, {
      props: {
        headerData: {
          image:
            "https://files.soundon.fm/1601380848736-bce0f26a-745c-4266-aee1-6d4df3479752.jpeg",
          mode: "episode",
          name: "EP263｜🦆",
        },
      },
    });
    const title = wrapper.get(".title");
    expect(title.text()).toContain("EP263｜🦆");
  });

  it("mode: episode, click play button and emit showPlayer", async () => {
    const wrapper = mount(HeaderItem, {
      props: {
        headerData: {
          image:
            "https://files.soundon.fm/1601380848736-bce0f26a-745c-4266-aee1-6d4df3479752.jpeg",
          mode: "episode",
          name: "EP263｜🦆",
        },
      },
    });
    const button = wrapper.get("button");
    await button.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("showPlayer");
  });
});
