const fs = require("fs");
const generatePage = require("../page/generate-page");
const generateEmptyState = require("../page/empty-state-template");

const content = `import { EmptyState, Page } from "@shopify/polaris";
const Index = () => (
  <Page>
    <EmptyState
      heading="Manage your inventory transfers"
      action={{ content: 'Add transfer' }}
      secondaryAction={{ content: 'Learn more about empty state', url: 'https://polaris.shopify.com/components/structure/empty-state' }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Track and receive your incoming inventory from suppliers.</p>
    </EmptyState>
  </Page>
)
export default Index;`

jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
  existsSync: page => page === "pages/test.js" ? true : false
}));

it("should call writeFile if file does not exist", () => {
  generatePage(generateEmptyState, "pages", ["route", "route", "generate-empty-state-page", "index"]);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "pages/index.js",
    expect.any(String),
    expect.any(Function)
  );
});

it("should not call writeFile if file does exist", () => {
  generatePage(jest.fn(), "pages", ["route", "route", "generate-empty-state-page", "test"]);
  const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
  expect(writeFileSyncSpy).toHaveBeenCalledTimes(0);
});
