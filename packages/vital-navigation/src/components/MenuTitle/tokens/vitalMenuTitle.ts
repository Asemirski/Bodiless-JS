/**
 * Copyright © 2022 Johnson & Johnson
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

import { withNodeKey, withSidecarNodes } from '@asemirsk/core';
import {
  Div,
  as,
  replaceWith,
  startWith,
} from '@asemirsk/fclasses';
import { withBodilessLinkToggle, withPlaceholder } from '@asemirsk/components';
import { asBodilessLink } from '@asemirsk/components-ui';
import { vitalEditorPlain } from '@asemirsk/vital-editors';
import { vitalLink } from '@asemirsk/vital-link';
import { asMenuTitleToken } from '../MenuTitleClean';
import { withMenuTitleNoLink } from '../../../util';

/**
 * @private
 */
const asMenuLink = (asEditableLink: typeof asBodilessLink) => withSidecarNodes(
  asEditableLink('link', undefined, () => ({ groupLabel: 'Menu Link' })),
);

/**
 * Default MenuTitleToken that applies default Editors to the Menu Titles.
 */
const Default = asMenuTitleToken({
  Theme: {
    Link: as(vitalLink.WithDownloadStyles, vitalLink.WithExternalStyles),
  },
  Editors: {
    Title: vitalEditorPlain.Default,
  },
  Schema: {
    Link: asMenuLink(withBodilessLinkToggle(asBodilessLink, startWith(Div), true)),
    Title: withNodeKey('text'),
  },
  Content: {
    Title: withPlaceholder('Menu Item'),
  },
});

/**
 * WithLinkDisabled makes default menu title link as empty.
 */
const WithLinkDisabled = asMenuTitleToken({
  ...Default,
  Schema: {
    ...Default.Schema,
    Link: replaceWith(Div),
    // Needs to delete link from title to avoid
    // additional Overview link applied by withOverviewLink.
    Title: withMenuTitleNoLink,
  },
});

export default {
  Default,
  WithLinkDisabled,
};
