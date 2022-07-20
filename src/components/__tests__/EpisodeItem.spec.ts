import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import EpisodeItem from "../EpisodeItem.vue";

describe("EpisodeItem", () => {
  it("episode title and description", () => {
    const wrapper = mount(EpisodeItem, {
      props: {
        episodeDetail: {
          id: "1",
          name: "EP262 | 🌳",
          encodedDescription:
            "<p>糖漿一如往常短線還是滿有用的，後面ㄋ？</p>\n<p><br></p>\n<p>本集節目由國泰證券贊助</p>\n<p><br></p>\n<p>利用國泰證券定期定額投資，分批投入、平均成本且適當分散風險。</p>\n<p>標的多元且日日扣服務讓投資更彈性，每個月只要1千元就可以輕鬆投資！</p>\n<p><br></p>\n<p>8/16前透過主委專屬連結完成開戶，即可獲得粉絲專屬開戶禮7-11商品卡100元，9/30前完成1筆定期定額交易還可以再獲得100元，等於輕輕鬆鬆就可以賺到200元</p>\n<p>立即登錄活動：https://cathaysec.tw/N7w3jY</p>\n<p><br></p>\n<p>股癌傳送門：https://linktr.ee/gooaye</p>",
          audio:
            "https://chtbl.com/track/4B4E1D/rss.soundon.fm/rssf/954689a5-3096-43a4-a80b-7810b219cef3/feedurl/7249d761-03ad-490a-8851-ad78d52de7c3/rssFileVip.mp3?timestamp=1657965362460",
          image:
            "https://files.soundon.fm/1601380848736-bce0f26a-745c-4266-aee1-6d4df3479752.jpeg",
        },
      },
    });
    const title = wrapper.get("h2");
    expect(title.text()).toContain("Episode description");
    const description = wrapper.get(".description");
    expect(description.text()).toContain(
      "糖漿一如往常短線還是滿有用的，後面ㄋ？"
    );
  });
});
