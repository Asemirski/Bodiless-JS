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

import {
  withChild,
  withNode,
  withNodeKey,
} from '@bodiless/core';
import { vitalColor, vitalSpacing } from '@bodiless/vital-elements';
import {
  vitalBurgerMenu,
  vitalMenu,
  asBurgerMenuToggler,
} from '@bodiless/vital-navigation';
import {
  as,
  flowHoc,
} from '@bodiless/fclasses';
import { vitalSearchMenu, vitalSearchToggler, asSearchMenuToggler } from '@bodiless/vital-search';
import { vitalButtons } from '@bodiless/vital-buttons';
import { vitalLogo } from '../../Logo';
import { asHeaderToken } from '../HeaderClean';
import BurgerIcon from '../assets/BurgerIcon';

/**
 * Token that defines a basic header.
 */
const Base = asHeaderToken({
  Core: {
    MenuToggler: asBurgerMenuToggler,
    SearchToggler: asSearchMenuToggler,
  },
  Components: {
    SearchToggler: vitalSearchToggler.Default,
    Logo: vitalLogo.Default,
    Menu: vitalMenu.TopNav,
    BurgerMenu: flowHoc(
      as(vitalBurgerMenu.Default),
      // @TODO: Is there a better way to inject WhereToBuy and (future) LanguageButton
      // components into the menu? Maybe, move the components to another package...
    ),
    DesktopSearch: vitalSearchMenu.Default,
    MobileSearch: vitalSearchMenu.Mobile,
    // UtilityMenu: vitalMenu.Utility,
    WhereToBuy: vitalButtons.WhereToBuy,
  },
  Layout: {
    Container: 'flex justify-between items-center',
    MenuContainer: 'hidden xl:flex justify-between items-center flex-grow',
    ActionMenuContainer: 'flex items-center',
    MenuToggler: 'flex justify-center items-center',
    MenuTogglerWrapper: 'flex xl:hidden',
  },
  Spacing: {
    Container: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint,
      'py-3 lg:py-0',
    ),
    ActionMenuContainer: 'pl-5',
    // @todo perhaps this should be an element spcing token ike "LargeIconSize".
    MenuToggler: 'w-6 h-6',
    MenuTogglerWrapper: 'my-4',
  },
  Theme: {
    Wrapper: vitalColor.BgPrimaryPage,
  },
  Schema: {
    Logo: withNodeKey({ nodeKey: 'Logo' }),
    _: withNode,
  },
  Content: {
    MenuToggler: withChild(BurgerIcon),
  },
});

const WithLanguageSelector = asHeaderToken({
  Theme: {
    LanguageSelectorWrapper: 'lg:border-vital-primary-divider lg:border-r-2',
  },
  Spacing: {
    LanguageSelectorWrapper: 'pl-5 lg:mr-5 lg:px-5 lg:py-2',
  }
});

const Default = asHeaderToken({
  ...Base,
});

const vitalHeader = {
  Base,
  Default,
  WithLanguageSelector,
};

export default vitalHeader;
