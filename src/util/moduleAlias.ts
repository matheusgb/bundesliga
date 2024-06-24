import * as path from 'path';
import moduleAlias from 'module-alias';

const paths = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
  '@src': path.join(paths, 'src'),
  '@test': path.join(paths, 'test'),
});
