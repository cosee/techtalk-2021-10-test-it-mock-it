import { Story } from "@storybook/react";
import { printHtml } from "src/utils/print";

export default {
  title: "printHtml()",
};

const Template: Story<{ html: string }> = (args) => {
  async function doPrint() {
    await printHtml(args.html);
    console.log("done")
  }
  return (
    <div>
      <button onClick={doPrint}>printHtml({args.html})</button>
    </div>
  );
};

export const SimpleDocument = Template.bind({});
SimpleDocument.args = {
  html: "<h1>Test</h1>",
};
