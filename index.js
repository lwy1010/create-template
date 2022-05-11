#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { prompt } = require("enquirer");
const { cyan, green, yellow, stripColors, magenta } = require("kolorist");

const cwd = process.cwd();
const TEMPLATES = [cyan("admin"), green("h5"), yellow("express"), magenta("miniprogram")];
const renameFiles = { _gitignore: ".gitignore" };

async function init() {
  const { name: projectName } = await prompt({
    type: "input",
    name: "name",
    message: `Project name:`,
    initial: "my-app",
  });

  const projectPath = path.join(cwd, projectName);
  console.log(`\nScaffolding project in ${projectPath}...`);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  } else {
    const existing = fs.readdirSync(projectPath);
    if (existing.length) {
      const { yes } = await prompt({
        type: "confirm",
        name: "yes",
        initial: "Y",
        message:
          `Target directory ${projectName} is not empty.\n` + `Remove existing files and continue?`,
      });
      if (yes) {
        emptyDir(projectPath);
      } else {
        return;
      }
    }
  }

  const { templateName } = await prompt({
    type: "select",
    name: "templateName",
    message: "Select a template:",
    choices: TEMPLATES,
  });
  const template = stripColors(templateName);
  const templateDir = path.join(__dirname, `template-${template}`);

  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(projectPath, renameFiles[file])
      : path.join(projectPath, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  const pkg = require(path.join(templateDir, `package.json`));
  pkg.name = path.basename(projectPath);
  write("package.json", JSON.stringify(pkg, null, 2));

  console.log(`\nDone. Now run:\n`);
  if (projectPath !== cwd) {
    console.log(`  cd ${path.relative(cwd, projectPath)}`);
  }
  console.log(`  npm install`);
  console.log(`  npm run dev`);
  console.log();
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

init().catch((e) => {
  console.error(e);
});
