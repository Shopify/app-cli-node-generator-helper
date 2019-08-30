#! /usr/bin/env node

const generatePage = require("./page/generate-page");
const createPageTemplate = require("./page/page-template");

function runThing(args) {
  console.log(args)
  generatePage(createPageTemplate, "pages", args);
};

runThing(process.argv);