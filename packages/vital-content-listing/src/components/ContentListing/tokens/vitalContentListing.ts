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

import { withNode, withNodeKey } from '@bodiless/core';
import { vitalContentListingFlowContainer } from '../../ContentListingFlowContainer';
import { vitalFilterByGroup } from '../../FilterByGroup';
import { asContentListingToken } from '../ContentListingClean';

const WithFilterSelector = asContentListingToken({
  Core: {
    Wrapper: vitalFilterByGroup.WithFilterSelector,
  }
});

const WithMultipleAllowedTags = asContentListingToken({
  Core: {
    Wrapper: vitalFilterByGroup.WithMultipleAllowedTags,
  },
});

const Default = asContentListingToken({
  Components: {
    Wrapper: vitalFilterByGroup.Default,
    Content: vitalContentListingFlowContainer.Default,
  },
  Schema: {
    _: withNode,
    Content: withNodeKey('content'),
  },
  Compose: {
    WithFilterSelector,
    // WithMultipleAllowedTags,
  },
});

const WithSingleAllowedTag = asContentListingToken({
  Core: {
    Wrapper: vitalFilterByGroup.WithSingleAllowedTag,
  },
});

export default {
  Default,
  WithFilterSelector,
  WithMultipleAllowedTags,
  WithSingleAllowedTag,
};
