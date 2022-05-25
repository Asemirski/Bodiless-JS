/**
 * Copyright © 2021 Johnson & Johnson
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

import { withSidecarNodes } from '@asemirsk/core';
import {
  withDesign, startWith, flowHoc,
} from '@asemirsk/fclasses';
import { ProductClean } from '@asemirsk/organisms';
import { BVInlineRatings } from '@asemirsk/bv';
import { GatsbyLink } from '@asemirsk/gatsby-theme-bodiless';
import { withEditorBasic, withEditorSimple } from '../Editors';
import {
  asEditableLink,
} from '../Elements.token';
import { asEditableImagePlain as asEditableImage } from '../Image';
import { asProductCardDefaultStyle } from './token';

export const asProductCard = flowHoc(
  withDesign({
    ImageLink: withSidecarNodes(
      asEditableLink('cta'),
      startWith(GatsbyLink),
    ),
    Image: asEditableImage('image'),
    TitleLink: withSidecarNodes(
      asEditableLink('cta'),
      startWith(GatsbyLink),
    ),
    Title: withEditorSimple('title', 'Product Title Text'),
    BvReviewLink: withSidecarNodes(
      asEditableLink('cta'),
      startWith(GatsbyLink),
    ),
    BvReview: () => BVInlineRatings,
    Body: withEditorBasic('body', 'Product Body Text'),
  }),
);

export const ProductCard = flowHoc(
  asProductCard,
  asProductCardDefaultStyle,
)(ProductClean);
