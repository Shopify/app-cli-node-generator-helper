const marketingActivitiesTemplate = `export const handleResume = async ctx => {
  ctx.body = {};
  ctx.status = 202; // Accepted
};
export const handlePause = async ctx => {
  ctx.body = {};
  ctx.status = 202; // Accepted
};
export const handleDelete = async ctx => {
  ctx.body = {};
  ctx.status = 202; // Accepted
};
export const handleRepublish = async ctx => {
  ctx.body = {};
  ctx.status = 202; // Accepted
};
export const handlePreloadFormData = async ctx => {
  ctx.body = {
    "form_data": {
      "budget": {
        "currency": 'USD',
      },
    },
  };
};
export const handlePreview = async ctx => {
  const placeholder_img = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png"
  const previewResponse = {
    "desktop": {
      "preview_url": placeholder_img,
      "content_type": "text/html",
      "width": 360,
      "height": 200
    },
    "mobile": {
      "preview_url": placeholder_img,
      "content_type": "text/html",
      "width": 360,
      "height": 200
    }
  }
  ctx.body = previewResponse;
};
export const handleErrors = async ctx => {
  const query = ctx.query;
  const requestId = query["request_id"]
  const message = query["message"]

  console.error(\`[Marketing Activity App Error Feedback] Request id: \${requestId}, message: \${message}\`)

  ctx.body = {};
};`;

module.exports = marketingActivitiesTemplate;
