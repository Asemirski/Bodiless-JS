import { getPackageTailwindConfig } from '@asemirsk/fclasses';

const resolver = (pkgName) => require.resolve(pkgName);

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver,
});
