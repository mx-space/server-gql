/*
 * @Author: Innei
 * @Date: 2020-04-30 18:14:55
 * @LastEditTime: 2020-10-07 22:48:25
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/ecosystem.config.js
 * @Copyright
 */

const env = require('dotenv').config().parsed
module.exports = {
  apps: [
    {
      name: 'MxSpace-server-v2',
      script: 'dist/main.js',
      autorestart: true,
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      // instances: 1,
      // max_memory_restart: env.APP_MAX_MEMORY || '150M',
      env: {
        NODE_ENV: 'production',
        ...env,
      },
    },
  ],
}
