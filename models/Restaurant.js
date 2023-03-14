import mongoose from "mongoose"

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    capacity: {
        type: Number
    },
    // email: {
    //     type: String,
    //     validate: {
    //         validator: (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
    //         message: "Please enter a valid email address"
    //     }
    // },
    address:{
        street: String,
        houseNumber: {
        type: String,
        validate: {
                validator: (v) => /^[0-9].*$/.test(v),
                message: "Please insert some kind of number as House number"
            }
        },
        zipCode: String,
        city: String,
        country: String,      
    },
    fotos: [
        {
            title: {
                type: String
            },
            url: {
                type: String,
                validate: {
                    validator: (v) => {
                        const val = v.startsWith("http") || v.startsWith("www")
                        return val
                    },
                    message: "Please write a valid URL"
                },
                required: true,
            },
        }
    ],
  
    
},{ timestamps: true },{ versionKey: false });
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export const getAll = async () => {
    const restaurant = await Restaurant.find();
    return restaurant;
};
export const create = async (document) => {
    const newRestaurant = new Restaurant(document);
    if (newRestaurant) {
      return {
        aprooved: true,
        data: await newRestaurant.save(),
        message: "Restaurant created ",
      };
    } else {
      return {
        aprooved: false,
        message: "Restaurant failed to create",
      };
    }
};
export const cityFilter = async () => {
   
    const result = await Restaurant.find({"address.city":"Berlin", capacity: {$gte:80}});
    return result;
}
export const getOne = async (restaurantId) => {
    const restaurant = await Restaurant.findOne({_id: restaurantId});
    return restaurant;
};
export const replace = async (restaurantId, data) => {
    const restaurant = await Restaurant.findOneAndReplace({_id: restaurantId}, data, {returnDocument: "after", runValidators: true},);

    return restaurant;
};
export const update = async (restaurantId, data) => {
    const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, data, {new: true, runValidators: true});

    return restaurant;
};
export const deleteOne = async (restaurantId) => {
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId)

    return restaurant;
};

export default Restaurant
