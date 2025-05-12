import { pascalCase, kebabCase } from 'change-case';

export default function (plop) {
  plop.setHelper('pascalCase', (txt) => pascalCase(txt));
  plop.setHelper('kebabCase', (txt) => kebabCase(txt));

  plop.setGenerator('component', {
    description: 'Generate a new px-ui component package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (e.g. button):',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '../packages/{{kebabCase name}}',
        base: './component',
        templateFiles: './component/**'
      }
    ],
  });
}
