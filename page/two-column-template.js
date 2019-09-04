const { toPascalCase } = require("../utilities");

const createTwoColumnTemplate = handle => {
  const componentName = toPascalCase(handle);
  return `import { Card, Layout } from '@shopify/polaris';

const ${componentName} = () => (
        <Layout>
          <Layout.Section oneHalf>
            <Card>
              Put content here
              For more information see: https://polaris.shopify.com/components/structure/layout
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card>
              Put content here
            </Card>
          </Layout.Section>
        </Layout>
      );
  export default ${componentName};`;
};

module.exports = createTwoColumnTemplate;
