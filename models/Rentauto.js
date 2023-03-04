import mongoose from "mongoose"

const rentautoSchema = mongoose.Schema({
    description: String,
    model: String,
    jahr: Number,
    price: Number,
    provider: {
        name: {
            type: String,
            // required: true
        },
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
const Rentauto = mongoose.model("Rentauto", rentautoSchema);

export const getAll = async () => {
    const rentauto = await Rentauto.find();
    return rentauto;
};
export const create = async (document) => {
    const newrentauto = new Rentauto(document);
    if (newrentauto) {
      return {
        aprooved: true,
        data: await newrentauto.save(),
        message: "Rent auto created ",
      };
    } else {
      return {
        aprooved: false,
        message: "Rent auto failed to create",
      };
    }
};
export const getOne = async (rentautoId) => {
    const rentauto = await Rentauto.findOne({_id: rentautoId});
    return rentauto;
};
export const replace = async (rentautoId, data) => {
    const rentauto = await Rentauto.findOneAndReplace({_id: rentautoId}, data, {returnDocument: "after", runValidators: true});

    return rentauto;
};
export const update = async (rentautoId, data) => {
    const rentauto = await Rentauto.findByIdAndUpdate(rentautoId, data, {new: true, runValidators: true});

    return rentauto;
};
export const deleteOne = async (rentautoId) => {
    const rentauto = await Rentauto.findByIdAndDelete(rentautoId)

    return rentauto;
};

export default Rentauto;
