module.exports = (ctx, endpoint) =>
  ctx.req
    ? `${ctx.req.protocol}://${ctx.req.headers.host}${endpoint}?token=${ctx.req.cookies._id}`
    : endpoint;
