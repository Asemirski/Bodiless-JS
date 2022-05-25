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

import {
  withTitle,
  withDesc,
} from '@asemirsk/layouts';
import {
  varyDesign,
  replaceWith,
  withDesign,
  flowHoc,
} from '@asemirsk/fclasses';
import { withType } from './Categories';
import { StandardTable, asTableFirstLeft, asTableFirstExtraWidth } from '../Table';

const tableVariation = {
  Table: flowHoc(
    replaceWith(StandardTable),
    withType('Table')(),
    withTitle('Table'),
    withDesc('A Table with Rich Text Cells.\n'),
  ),
  TableFirstHeader: flowHoc(
    replaceWith(StandardTable),
    asTableFirstLeft,
    asTableFirstExtraWidth,
    withType('Table')(),
    withTitle('Table Header First Column'),
    withDesc('A Table with Rich Text Cells, where the first Column is special.\n'),
  ),
};

export default withDesign(varyDesign(
  tableVariation,
)());
