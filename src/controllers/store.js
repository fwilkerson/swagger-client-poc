import send from "@polka/send-type";

import { HttpError } from "../lib/http";

export function enhancedOrderPet({ apis }) {
  return async (request, response) => {
    try {
      const { petId } = request.params;

      const { status, body } = await apis.pet.getPetById({ petId });

      // check the requests status
      if (status !== 200) {
        throw HttpError(status, body.message);
      }

      // check pet's status
      if (body.status !== "available") {
        throw HttpError(400, "The chosen pet is not available");
      }

      const order = {
        id: 0,
        petId,
        quantity: 1,
        shipDate: new Date(Date.now()).toISOString(),
        status: "placed",
        complete: false
      };

      const resp = await apis.store.placeOrder({ body: order });

      send(response, resp.status, resp.body);
    } catch (err) {
      send(response, err.code || 500, { error: err.message });
    }
  };
}
