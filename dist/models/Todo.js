import mongoose, { Schema } from "mongoose";
const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Todo title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});
export default mongoose.model('Todo', todoSchema);
