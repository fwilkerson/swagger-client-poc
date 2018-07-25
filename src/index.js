import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import polka from "polka";
import swagger from "swagger-client";

import { enhancedOrderPet } from "./controllers/store";
import { requestInterceptor } from "./lib/http";

(async () => {
  const {
    PORT = 3000,
    SWAGGER_URL = "https://petstore.swagger.io/v2/swagger.json"
  } = process.env;

  const { apis } = await swagger(SWAGGER_URL, { requestInterceptor });

  const app = await polka()
    .use(cors())
    .use(helmet())
    .use(bodyParser.json())
    .post("/store/order/:petId", enhancedOrderPet({ apis }))
    .listen(PORT);

  console.log(`> Running on port ${PORT}`);
})();
