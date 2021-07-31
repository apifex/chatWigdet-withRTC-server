import { config } from 'dotenv'
import mongoose, {Schema} from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

config()

interface IUser {
    email: string,
    hash?: string,
    salt?: string,
    createdOn?: Date,
    settings?: {
        telegramID: string,
        telegramToken?: string[],
        whatsappNumber?: string,
        telegramNumber?: string,
    }
    history?: Map<string, string>
}

interface IUserDocument extends IUser, mongoose.Document {
    generateJWT(): string,
    passwordToHash(password: string): void,
    validatePassword(password: string): Promise<boolean>,
    getId(): Promise<string>,
} 

interface IUserModel extends mongoose.Model<IUserDocument> {
    checkExistingField(field: string, value: string): Promise<IUserDocument | null>,
    build(args: IUser): any
}

const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, "\n")

const UserSchema = new mongoose.Schema<IUserDocument, IUserModel>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true},
    hash: {type: String},
    salt: {type: String},
    createdOn: {
        type: Date,
        default: Date.now()
    },
    lastActive: {
        type: Date,
        default: Date.now()
    },
    settings: {
        type: Schema.Types.Mixed,
    },
    history: {
        type: Map,
        of: String,
    }
})

UserSchema.methods.validatePassword = async function (password: string) {
    if (!this.salt || !this.hash) return
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 128, 128, "sha512")
        .toString("hex");
    return this.hash === hash
}

UserSchema.methods.passwordToHash = function (password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 128, 128, "sha512")
        .toString("hex");}

UserSchema.methods.generateJWT = function () {
return jwt.sign(
    { _id: this._id }, 
    jwtPrivateSecret, 
    { expiresIn: "10d",
    algorithm: "RS256", }
)};

UserSchema.methods.getId = function () {
    return {
        _id: this._id,
    }
}

UserSchema.statics.checkExistingField = async (field, value) => {
    const checkField = await UserModel.findOne({ [`${field}`]: value });
    return checkField;
};

UserSchema.statics.build = (args: IUser) => {
    return new UserModel(args)
}

const UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel
