const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reatcionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    }
})