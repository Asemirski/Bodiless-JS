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

import { flow } from 'lodash';
import pick from 'lodash/pick';
import {
  FilterByGroupClean,
  asTestableFilterByGroup,
  Tag,
  withSingleAllowedTag,
  withFilterSelection,
  asResponsiveFilterByGroup,
  // withMultipleAllowedTags,
} from '@asemirsk/filtering';
import {
  addProps, flowHoc, withDesign, Fragment, replaceWith,
} from '@asemirsk/fclasses';
import { withNodeKey } from '@asemirsk/core';
import { asFilterByGroupResponsive, asFilterByGroupDefaultStyle } from './token';
import { breakpoints as allBreakpoints } from '../Page';

const suggestions = [
  new Tag('1', 'DefaultTag 1'),
  new Tag('2', 'DefaultTag 2'),
  new Tag('3', 'DefaultTag 3'),
  new Tag('4', 'DefaultTag 4'),
];

const breakpoints = pick(allBreakpoints, 'lg');

export const asFilterByGroup = flowHoc(
  addProps({ suggestions }),
  asFilterByGroupResponsive,
  asFilterByGroupDefaultStyle,
  asTestableFilterByGroup,
  asResponsiveFilterByGroup(breakpoints),
);

const FilterByGroup = asFilterByGroup(FilterByGroupClean);

const withSingleAllowedTagNoReset = flowHoc(
  addProps({
    multipleAllowedTags: false,
    resetButtonText: '',
  }),
  withDesign({
    ResetButton: flowHoc(
      replaceWith(Fragment),
    ),
    Filter: withFilterSelection(),
  }),
);

const withSiteWideFilter = withDesign({
  Filter: withNodeKey({ nodeKey: 'filter', nodeCollection: 'site' }),
});

export const FilterByGroupSingleSiteWide = flow(
  addProps({ resetButtonText: 'Show All Products' }),
  withSingleAllowedTag,
  withSiteWideFilter,
  asFilterByGroup,
)(FilterByGroupClean);

export const FilterByGroupSingleSiteWideNoReset = flow(
  withSiteWideFilter,
  withSingleAllowedTagNoReset,
  asFilterByGroup,
)(FilterByGroupClean);

export default FilterByGroup;
export {
  ContextLogger,
} from './ContextLogger';
