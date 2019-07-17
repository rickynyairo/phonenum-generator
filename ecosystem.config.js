module.exports = {
  apps : [{
    name: 'PhoneNumberGeneratorAPI',
    script: 'npm',
    args: 'run start:node',
    exec_mode: "cluster",
    kill_timeout: 2000,
    restart_delay: 2000,
    instances: 4,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : "https://github.com/rickynyairo/phonenum-generator",
      path : '/var/www/production',
      'post-deploy' : 'yarn install && pm2-runtime reload ecosystem.config.js --env production'
    }
  }
};
