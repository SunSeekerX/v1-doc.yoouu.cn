/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-11-13 12:46:27
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-05-15 18:06:34
 */

module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.md': ['prettier --write'],
}
