//config
import * as en from '../../lang/en';
import * as ja from '../../lang/ja';
const allLang = { en, ja };

export function trans(lang, path) {
  const n = path.split('.');

  switch (n.length) {
    case 1:
      return allLang[lang][n[0]];
    case 2:
      return allLang[lang][n[0]][n[1]];
    case 3:
      return allLang[lang][n[0]][n[1]][n[2]];
    case 4:
      return allLang[lang][n[0]][n[1]][n[2]][n[3]];
    default:
      return path;
  }
}
