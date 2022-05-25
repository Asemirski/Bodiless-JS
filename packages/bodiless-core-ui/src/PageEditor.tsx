/**
 * Copyright © 2019 Johnson & Johnson
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

import React, { FC } from 'react';
import { PageEditor as PlainPageEditor } from '@asemirsk/core';
import GlobalContextMenu from './GlobalContextMenu';
import LocalContextMenu from './LocalContextMenu';
import PageOverlay from './PageOverlay';

const ui = {
  LocalContextMenu,
  GlobalContextMenu,
  PageOverlay,
};

const PageEditor: FC = props => <PlainPageEditor ui={ui} {...props} />;

export default PageEditor;
