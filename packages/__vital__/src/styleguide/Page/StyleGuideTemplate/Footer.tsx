import React from 'react';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@asemirsk/vital-templates';
import { flowHoc, on, replaceWith } from '@asemirsk/fclasses';
import { FooterClean, vitalFooter } from '@asemirsk/vital-layout';

// Apply similar method as done in the vitalLayout token.
const StickFooterLayout = asStyleGuideTemplateToken({
  ...vitalStyleGuideTemplate.NoLayout,
  Theme: {
    ...vitalStyleGuideTemplate.NoLayout.Theme,
    Container: 'flex flex-col h-screen',
    DescriptionWrapper: 'flex-grow',
  },
});

export const Footer = asStyleGuideTemplateToken(StickFooterLayout, {
  Meta: flowHoc.meta.term('Token')('Footer'),
  Content: {
    Title: replaceWith(() => <>Footer</>),
    Examples: on(FooterClean)(vitalFooter.Default),
  },
});
