#!/usr/bin/env node

const Koa = require("koa")

const app = new Koa()

app.use(async (ctx, next) => {
  console.log("doing ....")
  ctx.status = 200
  ctx.body = "ok"
})

app.listen(3000, () => {
  console.log("server is running ....")
})