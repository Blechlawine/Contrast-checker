import { configure, addDecorator } from '@storybook/vue';
import { jsxDecorator } from 'storybook-addon-jsx';

addDecorator(jsxDecorator);

require("../assets/global.css");

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
