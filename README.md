# MX Server Next

Stack

- NestJS
- GraphQL
- Mongoose

## Changes

与上代相比,

API 由 Restful 转向 GraphQL, 请求过程中的流量能节省不了, 接口参数也可以少写很多

架构上从 Fastify 暂时转向 Express, 因此请求并发性能降低大约 5 倍.

## Roadmap

**Query**

- [x] Post
- [x] Note
- [x] Category
- [ ] Auth
- [ ] Other

**Mutation**

TODO

**Socket**

TODO
