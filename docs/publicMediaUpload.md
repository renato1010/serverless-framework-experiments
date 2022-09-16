**Key interest features:**

- function will send upload requests(PutObjectCommand) to S3 bucket, generated QR codes(.png),  
  to do that the function requires _permissions_ for that specific bucket, in order to do that at function configuration level  
  as `role` property 👀 [src/functions/upload-media/index.ts](src/functions/upload-media/index.ts)

```ts
export const publicMediaUpload: AWS["functions"]["publicMediaUpload"] = {
  handler: `${handlerPath(__dirname)}/handler.publicMediaUpload`,
  role: "arn:aws:iam::${aws:accountId}:role/DefaultPublicMediaUploader",
```

- function will implement [middy middlewares](https://middy.js.org/docs/), **JsonBodyParser** that's almost default,maybe a bit more interesting is **SSM**  
  That will fetch AWS System Manager **parameter store**, we use this instead of `.env` files remember that your lambda will require permission for that too. **HttpErrorHandler** will take care of return http erros thrown at runtime.

- Endpoint will accept a base64 encoded binary file, for testing we pass `Body=binary` in postman, I think
  probable be better pass an **url-form** type of body, will do in upcoming iteration. I use that personally to upload images for public access like those shown as result in other `.md` files

- Probably even a better approach could be run a `sam cmd` directly to upload media. The endpoint was tested with several images/videos not bigger thatn 5MB

<br />  

![random gig](https://losormorpino-public-media.s3.us-east-2.amazonaws.com/2f00xtt.gif)
