import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SpanInfo } from ".";
import { mockedSpanInfoData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

const meta: Meta<typeof SpanInfo> = {
  title: "Navigation/SpanInfo",
  component: SpanInfo,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof SpanInfo>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    data: mockedSpanInfoData
  }
};

export const LargeText: Story = {
  args: {
    data: {
      ...mockedSpanInfoData,
      displayName:
        "Erat iriure lorem placerat dolor ex gubergren ipsum ea option justo vero duo gubergren dolores consetetur luptatum labore nulla aliquam ipsum placerat ipsum no est ea eos et dolore esse ea possim consetetur lorem laoreet elitr ipsum eros magna ut vero consectetuer et diam facilisis et et amet diam accusam soluta amet est dolor ea erat takimata exerci invidunt invidunt sed et mazim augue ut ipsum stet ut ut consetetur accusam at sea et stet dolores laoreet autem dolore amet et lobortis dolor sea dolore rebum labore possim ut lorem illum rebum in consetetur erat lorem sadipscing accusam sanctus erat no aliquam magna dolor dolore feugiat in dolor sed augue lorem consetetur euismod odio nibh ut ipsum ut magna lorem aliquyam elitr sit ea gubergren voluptua ea ea vero duis sea dolore hendrerit lorem vero esse vero nonumy tempor eos erat et autem est est in eirmod justo consequat nulla erat sea nostrud ut lorem sit odio eleifend in est voluptua at sed sed possim et aliquam erat ipsum sed sed aliquyam sed diam dolores ipsum at quis in diam tempor autem eleifend labore consequat labore facilisi elitr est et dolores diam ea eirmod eum no lorem eos ea eirmod et invidunt iusto elitr adipiscing elit dolores et ut dolor sed sea sanctus diam duo sed stet sed tincidunt accusam consetetur sed dolore mazim vero dolor autem lorem nulla sea sadipscing nonumy stet odio duo consequat diam sea ipsum tempor et feugait vero ipsum et no accusam sed et qui eum diam ipsum quod nostrud sadipscing lorem rebum duo elit sit dolor invidunt diam feugait dolor amet ut et ea dolor est vero in vero ut lorem sed diam ea aliquyam aliquip labore amet amet et sed eirmod consetetur euismod sit clita eos elitr ut et eos et consetetur rebum rebum ut sea ut praesent hendrerit ipsum erat et sadipscing eirmod euismod tempor ipsum duis magna clita sed eleifend diam facilisis diam elitr stet ea nonumy magna commodo ipsum lorem duis quod ut sit sit amet consequat et imperdiet ea stet clita duo amet ipsum voluptua vero nonumy ut lorem nibh ea nulla elit illum vero dolor at sea feugiat doming justo diam kasd wisi rebum est elitr dolor aliquip duo et nibh dolor ea blandit eos elitr diam justo lorem voluptua vero ea eum adipiscing sed invidunt clita diam ut illum accusam duo sea nostrud ut magna soluta eos et dolore invidunt eos tempor sadipscing lorem dolore dolor sit sit amet sit invidunt aliquyam vel autem doming aliquip labore vel justo aliquyam at ipsum labore sit duis diam ipsum dolore dignissim exerci lorem dolor wisi diam sit stet tempor sanctus sit blandit gubergren voluptua amet dolore consequat tempor takimata dolores sea ea blandit ullamcorper dolor sit sed esse ipsum ipsum laoreet elitr commodo ipsum lorem erat ipsum dolores sed amet quod et dolor facilisi esse sit justo amet justo dolor nostrud dolore ut dignissim at odio nonumy kasd sit diam nonumy eos kasd sanctus dignissim est eirmod sadipscing te est labore duo nonumy kasd hendrerit et vel diam duo amet blandit erat illum amet nisl dolor exerci diam clita at justo et sit et illum sit lorem sit et illum sit te ipsum amet sit placerat velit sed sed et vero stet ipsum sit consetetur et nihil te dolores qui enim kasd dolore dolores dolore justo ipsum dolor diam magna blandit invidunt sanctus ipsum lorem vero sea invidunt erat et sit duo lorem feugiat sanctus sea invidunt et exerci duo sed magna erat dolore et tempor quis et ut eos eirmod labore dolor luptatum duo tempor sed sit ipsum ipsum hendrerit clita sadipscing dolor invidunt dolor kasd iusto iriure lorem consequat invidunt laoreet diam sed in sed lorem lorem dolores erat ut blandit invidunt diam amet accusam dolor consetetur ut accusam sed justo elitr ut lorem nonumy imperdiet velit vero consetetur elitr sadipscing augue minim sit facilisis justo et amet aliquyam tempor sit aliquyam vero sanctus dolor sanctus vero ex at gubergren feugiat id illum consetetur amet dolores consectetuer stet amet nibh duo voluptua invidunt lorem sed est assum diam vero dolores duo eirmod aliquyam labore amet nonumy labore vel te dolore et dolore ipsum labore feugiat gubergren sed voluptua dignissim gubergren justo possim rebum invidunt justo accusam accumsan et rebum velit dolore ipsum euismod nulla tation amet diam adipiscing lorem kasd lorem ea ex labore tation ut diam sed facer nulla diam gubergren at rebum et erat duo justo rebum vero et ipsum et est aliquyam sea nonumy facilisi elitr velit sed sanctus vero sadipscing kasd tempor invidunt magna duis labore sadipscing duo ipsum diam augue et eos aliquyam facilisis eum sea tempor invidunt no diam labore amet congue diam autem dolor eirmod ipsum lorem minim autem gubergren dolore ipsum erat sadipscing nisl sed veniam dolore et amet congue nostrud kasd ut elitr dolore iriure voluptua diam facilisis lorem kasd diam sea sanctus sadipscing lorem accusam tincidunt aliquam consetetur feugait magna gubergren laoreet voluptua nihil ipsum velit nulla sanctus dolor kasd ut zzril nonumy facilisis quis ut vero eirmod sed in at amet lorem voluptua accusam ut at elitr tempor sanctus wisi tincidunt nonumy euismod dolor sed ea cum takimata liber gubergren clita dolor lorem elitr veniam gubergren velit ipsum ipsum sit erat et et nostrud et hendrerit sit in et voluptua takimata stet diam ea diam et erat at justo sea dolor rebum at luptatum accusam sadipscing augue labore nonumy et sea eirmod eu magna labore sea takimata et ut ipsum ea diam et euismod molestie takimata facilisis nonumy vel invidunt eirmod kasd ut in nihil dolores at invidunt in et stet et illum dolor illum erat ipsum praesent magna accusam justo voluptua hendrerit et tation voluptua esse vel amet eu dolore dolore accusam elitr molestie amet lorem sit voluptua sit et est zzril rebum eos amet ea magna consetetur tempor lorem sed tincidunt clita esse duis possim ut ea erat dolor duis diam est eos tation quis nonumy sed duo quis zzril et aliquyam in enim"
    }
  }
};
