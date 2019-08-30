const fs = require("fs");
const generatePage = require("../page/generate-page");

const content = `import { EmptyState, Page } from "@shopify/polaris";
const Index = () => (
  <Page>
    <EmptyState
      heading="Manage your inventory transfers"
      action={{ content: 'Add transfer' }}
      secondaryAction={{ content: 'Learn more', url: 'https://help.shopify.com' }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Track and receive your incoming inventory from suppliers.</p>
    </EmptyState>
  </Page>
)
export default Index;`

jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
  existsSync: page => {
    if (page === "pages/test.js") {
      return true;
    } else {
      return false;
    }
  }
}));

it("should call writeFile if file does not exist", () => {
  generatePage(jest.fn(), "pages", ["route", "route", "generate-empty-state-page", "index"]);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "pages/index.js",
    content,
    expect.any(Function)
  );
});

it("should not call writeFile if file does exist", () => {
  generatePage(jest.fn(), "pages", ["route", "route", "generate-empty-state-page", "test"]);
  const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
  expect(writeFileSyncSpy).toHaveBeenCalledTimes(0);
});
