/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import merge from 'lodash/merge';
import flatten from 'lodash/flatten';
import path from 'path';

type TailwindConfig = {
  content?: string[],
  theme?: object,
  plugins?: string[],
};

type Package = {
  root: string,
  tailwindConfig: TailwindConfig,
};

const getTailwindConfigs = (packages: Package[]) => packages
  .map(({ root, tailwindConfig }) => ({
    ...tailwindConfig,
    ...(
      tailwindConfig.content !== undefined && Array.isArray(tailwindConfig.content)
        ? {
          content: tailwindConfig.content.map((rule: string) => path.join(root, rule)),
        }
        : {}
    ),
  }))
  .filter(Boolean);

const mergeConfigs = (
  siteConfig: TailwindConfig,
  packages: Package[],
) => {
  const packageConfigs = getTailwindConfigs(packages);
  return {
    ...siteConfig,
    // content setting
    content: [
      './src/**/!(*.d).{ts,js,jsx,tsx}',
      ...flatten(merge(packageConfigs).map((config: TailwindConfig) => config.content)),
      ...(siteConfig.content ? siteConfig.content : []),
    ],
    // theme setting
    // dummy first argument because of https://github.com/microsoft/TypeScript/issues/28010#issuecomment-713484584
    theme: merge({}, ...packageConfigs, siteConfig).theme,
    plugins: [
      ...flatten(
        merge(packageConfigs).map((config: TailwindConfig) => config.plugins),
      ).filter(Boolean),
      ...(siteConfig.plugins ? siteConfig.plugins : []),
    ],
  };
};

export {
  mergeConfigs,
};
export type {
  TailwindConfig,
  Package,
};
