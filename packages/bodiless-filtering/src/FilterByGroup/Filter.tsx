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

/* eslint-disable arrow-body-style, max-len, @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { flow, isEmpty } from 'lodash';
import {
  withNodeKey,
  withNode,
  withNodeDataHandlers,
  ifReadOnly,
  ifEditable,
  withContextActivator,
  withLocalContextMenu,
} from '@bodiless/core';
import {
  designable,
  Div,
  H3,
  Input,
  Label,
  withDesign,
  replaceWith,
  stylable,
  asToken,
  HOC,
  withoutProps,
  startWith,
  ComponentOrTag,
  ComponentWithMeta,
} from '@bodiless/fclasses';
import {
  asEditable,
  asBodilessList,
  asSubList, withDeleteNodeOnUnwrap,
  withSubLists,
  ifViewportIsNot,
  withTagButton,
} from '@bodiless/components';
import { asAccordionBody, asAccordionTitle, asAccordionWrapper } from '@bodiless/accordion';
import {
  TagTitleProps,
  TagTitleComponents,
} from './types';
import { useFilterByGroupContext, withTagProps } from './FilterByGroupContext';
import { useTagsAccessors } from './FilterModel';
import { withCategoryListContextProvider } from './CategoryListContext';

const tagTitleComponentsStart: TagTitleComponents = {
  FilterInputWrapper: Div,
  FilterGroupItemInput: Input,
  FilterGroupItemPlaceholder: Label,
  FilterGroupItemLabel: Label,
};

const withUnselectOnDelete: HOC<{ onDelete?: any }> = Component => props => {
  const {
    clearSelectedTags,
  } = useFilterByGroupContext();

  const onDelete = () => {
    clearSelectedTags();
  };
  return <Component {...props} onDelete={onDelete} />;
};

const TagTitleBase: FC<TagTitleProps> = ({
  components,
  emptyTitleText = 'Select Tag...',
  ...rest
}) => {
  const {
    FilterGroupItemInput,
    FilterGroupItemLabel,
    FilterGroupItemPlaceholder,
    FilterInputWrapper,
  } = components;

  const { tag } = useTagsAccessors();

  const {
    selectTag,
    isTagSelected,
    unSelectTag,
    multipleAllowedTags,
  } = useFilterByGroupContext();

  const onSelect = () => (isTagSelected(tag) ? unSelectTag(tag) : selectTag(tag));

  if (tag === undefined) return <></>;

  return (
    <FilterInputWrapper {...rest} key={tag.id}>
      <FilterGroupItemInput
        type={multipleAllowedTags ? 'checkbox' : 'radio'}
        name="filter-item"
        value={tag.id}
        id={tag.id}
        onChange={() => onSelect()}
        checked={isTagSelected(tag)}
      />
      {
        isEmpty(tag.name)
          ? (<FilterGroupItemPlaceholder htmlFor={tag.id}>{ emptyTitleText }</FilterGroupItemPlaceholder>)
          : (<FilterGroupItemLabel htmlFor={tag.id}>{ tag.name }</FilterGroupItemLabel>)
      }
    </FilterInputWrapper>
  );
};

const TagTitle = flow(
  withoutProps([
    'componentData',
    'onContextMenu',
    'getSuggestions',
    'allowMultipleTags',
    'noSuggestionsText',
    'seeAllText',
    'formTitle',
    'formBodyText',
    'selectedTags',
    'registerSuggestions',
  ]),
  ifEditable(
    withTagButton(),
    withContextActivator('onClick'),
    withLocalContextMenu,
  ),
  ifReadOnly(withoutProps(['setComponentData'])),
  withTagProps({
    allowMultipleTags: false,
    placeholder: 'Add or Create',
    formTitle: 'Group Membership',
    formBodyText: 'Select from available groups:',
    seeAllText: 'View All Groups',
    noSuggestionsText: 'No matching groups found.',
  }),
  withNodeDataHandlers({ tags: [] }),
  withNode,
  withNodeKey('tag'),
  designable(tagTitleComponentsStart, 'TagTitle'),
)(TagTitleBase);

const asFilter = asToken(
  asBodilessList(undefined, undefined, () => ({ groupLabel: 'Group' })),
  withDesign({
    Title: asToken(
      replaceWith(H3),
      asEditable('category_name', 'Category Name'),
    ),
    Item: asToken(
      stylable,
      withCategoryListContextProvider,
    ),
    Wrapper: stylable,
  }),
  withSubLists(1)(
    asToken(
      asSubList(() => ({ groupLabel: 'Tag' })),
      withDeleteNodeOnUnwrap('sublist'),
      withUnselectOnDelete,
      withDesign({
        Title: startWith(TagTitle),
        Wrapper: flow(
          stylable,
        ),
      }),
    ),
  ),
  ifViewportIsNot(['lg', 'xl', 'xxl'])(
    withDesign({
      Item: asToken(
        asAccordionWrapper,
        withDesign({
          SubList: withDesign({
            Wrapper: asAccordionBody,
          }),
        }),
      ),
      Title: asAccordionTitle,
    }),
  ),
);

type FilterProps = {
  design: {
    CategoryList: HOC,
    TagList: HOC,
  },
};

const withFilterDesignTransformer = <P extends object>(Component: ComponentOrTag<P & FilterProps>) => {
  class WithFilterDesignTransformer extends React.PureComponent {
    Filter: ComponentWithMeta<P> = React.Fragment;

    RestProps = {};

    constructor(props: P & FilterProps) {
      super(props);
      const { design, ...restProps } = props;
      const {
        CategoryList: withCategoryListDesign,
        TagList: withTagListDesign,
        ...restDesignProps
      } = design;
      this.RestProps = {
        ...restProps,
        design: restDesignProps,
      };
      // @ts-ignore
      this.Filter = asToken(
        withCategoryListDesign,
        withDesign({
          Item: asToken(
            withDesign({
              SubList: withTagListDesign,
            }),
          ),
        }),
      )(Component);
    }

    render() {
      return (<this.Filter {...this.RestProps as P} />);
    }
  }

  return WithFilterDesignTransformer;
};

const FilterClean = asToken(
  asFilter,
  withFilterDesignTransformer as HOC,
  withNodeKey('filter'),
)('ul');

export default FilterClean;
