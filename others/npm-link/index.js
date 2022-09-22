/**
 * 
 * 在一个项目的根目录执行npm link, 被链接到全局，路径是{prfix}/node_modules/<package>,
 * 可以通过npm config get prefix 获取 prefix； 在另外一个项目中执行npm link <package>,
 * 会链接到该项目的 node_modules中去
 * 
 * 
 */