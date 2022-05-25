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

import React, { ComponentType, FC } from 'react';
import { withPrependChild } from '@asemirsk/core';
import {
  Div,
  Span,
  flowHoc,
  addProps,
  addClasses,
  withDesign,
  designable,
  DesignableComponentsProps,
} from '@asemirsk/fclasses';

/**
 * Type for the Designable LibraryItemIndicator Components.
 */
export type LibraryItemIndicatorComponentsType = {
  Wrapper: ComponentType<any>,
  Icon: ComponentType<any>,
  Label: ComponentType<any>,
};

type LibraryIndicatorProps = DesignableComponentsProps<LibraryItemIndicatorComponentsType>;

const LibraryItemIndicatorComponents: LibraryItemIndicatorComponentsType = {
  Wrapper: Div,
  Icon: Span,
  Label: Span,
};

const LibraryIndicatorBase: FC<LibraryIndicatorProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Icon />
    <C.Label />
  </C.Wrapper>
);

/**
 * Clean Library Item Indicator component.
 * It has Library `Icon` and `Label` designable components.
 */
export const LibraryItemIndicatorClean = designable(LibraryItemIndicatorComponents, 'LibraryItemIndicator')(LibraryIndicatorBase);

const asDefaultLibraryItemIndicator = withDesign({
  Wrapper: addClasses('bl-hidden group-hover:bl-flex bl-items-center bl-text-white bl-bg-gray-900 bl-absolute bl-px-2 bl-py-1 md:bl--mt-5 md:bl--ml-5 bl-z-10'),
  Icon: flowHoc(
    addClasses('bl-material-icons bl-small-icon bl-mr-2'),
    addProps({ children: 'account_balance' }),
  ),
  Label: addProps({ children: 'Library Item' }),
});

/**
 * HOC that may be applied to a `ComponentWrapper` component of a Flow Container.
 * It Prepends a designable `LibraryItemIndicator` child component that appears
 * on the `ComponentWrapper` hover.
 */
export const withLibraryItemIndicator = flowHoc(
  addClasses('bl-group'),
  withPrependChild(LibraryItemIndicatorClean, 'LibraryItemIndicator'),
  withDesign({
    LibraryItemIndicator: asDefaultLibraryItemIndicator,
  }),
);
