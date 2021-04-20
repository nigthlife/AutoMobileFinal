/**
 * Created by PanJiaChen on 16/11/18.
 * 定义验证规则
 */

/**
 * @param {string} path
 * @returns {Boolean}
 * 验证是否是合法url
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 验证用户名
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor','s001','lsp']
  // 计算用户名长度是否大于0
  return valid_map.indexOf(str.trim()) >= 0
}
