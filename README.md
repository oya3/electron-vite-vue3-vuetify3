# electron-vue3-sample

An Electron application with Vue

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# これやらないと、src/renderer/public の内容がコピーされない様子...
$ npm run build

# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### eslint 設定内容

``` bash
$ npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · google
√ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-google@latest
The config that you've selected requires the following dependencies:

eslint-plugin-vue@latest eslint-config-google@latest eslint@>=5.16.0
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
Installing eslint-plugin-vue@latest, eslint-config-google@latest, eslint@>=5.16.0

added 1 package, changed 1 package, and audited 482 packages in 3s

79 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created .eslintrc.js file
```
