# Strapi Front

## Account Provider

### Steps

1. href to  
   `https://strapi.songlairui.cn/connect/${provider}`  
   `https://strapi.songlairui.cn/connect/github`
2. redirect with Params

## Deployment

1. use docker snap base node_module
2. clone pure repo
3. use docker-compose config mount point
   3.1 pre-build `docker-compose run strapi_b_web yarn build`
