import { configure, addDecorator } from '@storybook/vue';
import { jsxDecorator } from 'storybook-addon-jsx';

addDecorator(jsxDecorator);
<<<<<<< HEAD

require("../pages/index");
=======
>>>>>>> f95e0d8af25e19277cc83eb358f80e31b92ad0f5

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
