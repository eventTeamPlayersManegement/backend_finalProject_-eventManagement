import mongoose from "mongoose"

const entertainmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
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
const Entertainment = mongoose.model("Entertainment", entertainmentSchema);

export const getAll = async () => {
    const entertainment = await Entertainment.find();
    return entertainment;
};
export const create = async (document) => {
    const result = new Entertainment(document);
    if (result) {
      return {
        aprooved: true,
        data: await result.save(),
        message: "Entertainment created ",
      };
    } else {
      return {
        aprooved: false,
        message: "Entertainment failed to create",
      };
    }
};
export const getOne = async (entertainmentId) => {
    const entertainment = await Entertainment.findOne({_id: entertainmentId});
    return entertainment;
};
export const replace = async (entertainmentId, data) => {
    const entertainment = await Entertainment.findOneAndReplace({_id: entertainmentId}, data, {returnDocument: "after", runValidators: true},);

    return entertainment;
};
export const update = async (entertainmentId, data) => {
    const entertainment = await Entertainment.findByIdAndUpdate(entertainmentId, data, {new: true, runValidators: true});

    return entertainment;
};
export const deleteOne = async (entertainmentId) => {
    const entertainment = await Entertainment.findByIdAndDelete(entertainmentId)

    return entertainment;
};

export default Entertainment;
