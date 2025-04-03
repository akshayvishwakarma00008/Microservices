import mongoose from "mongoose";

//an interface describe the properties required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

//an interface that describe the model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//an inteface that describes the properties that a user has
interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
}


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// we are not going to call the new User directly
//rather we are going to use typescript and to make sure typescrpt is applied properly
//we going to call the below function and there we are applying the UserAttrs so that TS can come into action
// and inside it we are create a new user
//Note: we did this because TS and MongoDb dont go hand in hand
//also here we have attached the build function directly to the the userSchema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
