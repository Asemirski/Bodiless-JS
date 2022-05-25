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

import { asReadOnly } from '@asemirsk/core';
import {
  BreadcrumbsClean,
  asBreadcrumbs,
  withEditableStartingTrail,
  withEditableFinalTrail,
  withMenuTitleEditors,
} from '@asemirsk/navigation';
import { flowHoc } from '@asemirsk/fclasses';

import {
  $withBreadcrumbStyles,
  asAccessibleBreadcrumbs,
} from './MenuBreadcrumbs.token';

const $withBreadcrumbEditors = flowHoc(
  withMenuTitleEditors(undefined, asReadOnly),
  withEditableStartingTrail(undefined, { nodeCollection: 'site' }),
  withEditableFinalTrail(),
);

const BreadcrumbsBase = flowHoc(
  asBreadcrumbs,
  $withBreadcrumbEditors,
  $withBreadcrumbStyles,
  asAccessibleBreadcrumbs,
)(BreadcrumbsClean);

export default BreadcrumbsBase;
