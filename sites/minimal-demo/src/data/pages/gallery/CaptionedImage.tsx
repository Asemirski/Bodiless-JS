import React, { FC, HTMLProps } from 'react';
import { asBodilessImage } from '@asemirsk/components-ui';
import { withNode } from '@asemirsk/core';
import {
  Img, Section, Div, addClasses, as, stylable,
} from '@asemirsk/fclasses';
import withSimpleEditor from './withSimpleEditor';

const Wrapper = Section;
const Image = as(addClasses('w-full'), asBodilessImage('image'))(Img);
const Body = withSimpleEditor('caption', 'Caption')(Div);

const CaptionedImageBase: FC<HTMLProps<HTMLElement>> = props => (
  <Wrapper {...props}>
    <Image />
    <Body />
  </Wrapper>
);

const CaptionedImage = as(
  stylable,
  withNode,
)(CaptionedImageBase);

export default CaptionedImage;
