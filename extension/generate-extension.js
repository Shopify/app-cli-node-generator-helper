const parseExpression = require("@babel/parser").parse;
const traverse = require("@babel/traverse").default;
const get = require("lodash.get");
const fs = require("fs");

const marketingActivitiesTemplate = require("./marketing-activities-template.js")

const generateExtension = (ast, type) => {
  let mainRouterDeclaration;
  let mainRouterConfiguration;
  let lastRoutesCall;
  let lastImport;

  const extensionImport = `import * as marketingActivities from "./marketing-activities.js";`;
  const routerCreation = `const apiRouter = new Router();`;
  const routerConfiguration = `
    apiRouter.prefix("/api");
    apiRouter.patch("/resume", marketingActivities.handleResume);
    apiRouter.patch("/pause", marketingActivities.handlePause);
    apiRouter.patch("/delete", marketingActivities.handleDelete);
    apiRouter.post("/republish", marketingActivities.handleRepublish);
    apiRouter.post("/preload_form_data", marketingActivities.handlePreloadFormData);
    apiRouter.post("/preview", marketingActivities.handlePreview);
    apiRouter.post("/errors", marketingActivities.handleErrors);`
  const serverRouterConfiguration = `server.use(apiRouter.routes());`

  let extensionRouterDeclaration;
  traverse(ast, {
    VariableDeclarator(path) {
      const indentifierName = get(path, ["node", "id", "name"]);
      if (indentifierName === `apiRouter`) {
        extensionRouterDeclaration = path;
      }
    }
  });
  if (extensionRouterDeclaration) {
    return ast;
  }

  const apiDir = 'server/api'
  const apiFile = `${apiDir}/${type}.js`;
  if (fs.existsSync(apiFile)) {
    process.exitCode = 2;
  } else {
    if (!fs.existsSync(apiDir)){
      fs.mkdirSync(apiDir);
    }
    fs.writeFileSync(apiFile, marketingActivitiesTemplate, err => {
      if (err) process.exitCode = 1;
      console.log(`${apiFile} was successfully created!`);
    });
  }

  traverse(ast, {
    ImportDeclaration(path) {
      lastImport = path;
    }
  });
  traverse(ast, {
    VariableDeclarator(path) {
      const indentifierName = get(path, ["node", "id", "name"]);
      if (indentifierName === `router`) {
        mainRouterDeclaration = path.getStatementParent();
      }
    }
  });
  traverse(ast, {
    MemberExpression(path) {
      const object = get(path, ["node", "object", "name"]);
      const method = get(path, ["node", "property", "name"]);
      if (method === "get" && object === "router") {
        mainRouterConfiguration = path.getStatementParent();
      }
    }
  });
  traverse(ast, {
    MemberExpression(path) {
      const object = get(path, ["node", "object", "name"]);
      const method = get(path, ["node", "property", "name"]);
      if (method === "routes" && object === "router") {
        lastRoutesCall = path.getStatementParent();
      }
    }
  });

  lastImport.insertAfter(
    parseExpression(extensionImport, {
      sourceType: "module"
    })
  );
  mainRouterDeclaration.insertAfter(
    parseExpression(routerCreation, {
      sourceType: "module"
    })
  );
  mainRouterConfiguration.insertAfter(
    parseExpression(routerConfiguration, {
      sourceType: "module"
    })
  );
  lastRoutesCall.insertAfter(
    parseExpression(serverRouterConfiguration, {
      sourceType: "module"
    })
  );

  return ast;
};

module.exports = generateExtension;
