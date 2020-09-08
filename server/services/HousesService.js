import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class HousesService {

  async find(query = {}) {
    return await dbContext.Houses.find(query)
  }
  async getById(id) {
    let data = await dbContext.Houses.findById(id);
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
    return data
  }
  async create(body) {
    return await dbContext.Houses.create(body)
  }
  async edit(body) {
    let update = await dbContext.Houses.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!update) {
      throw new BadRequest("Invalid Id")
    }
    return update
  }

  async bid(body) {
    let house = await this.getById(body.id)
    // @ts-ignore
    if (body.price < house.price) {
      throw new BadRequest("price must only go up")
    }
    // @ts-ignore
    house.price = body.price
    await house.save()
    return house
  }

  async delete(id) {
    let success = await dbContext.Houses.findByIdAndDelete(id)
    if (!success) {
      throw new BadRequest("Invalid Id")
    }
  }

}

export const housesService = new HousesService();