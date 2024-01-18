const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    volunteer: { type: Schema.Types.ObjectId, ref: 'Volunteer' },
    status: { type: String, enum: ['Open', 'Assigned', 'Closed'], default: 'Open', required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    // createdAt: { type: Date, default: Date.now, expires: '1d', required: true },
    location: {
        type: { type: String },
        coordinates: {
            type: [Number],
            validate: {
                validator: function (val) {
                    return val.length === 2 &&
                        val[0] >= -180 && val[0] <= 180 &&
                        val[1] >= -90 && val[1] <= 90;
                },
                message: props => `${props.value} is not a valid coordinate.`
            }
        }
    }
});

issueSchema.index({location: '2dsphere'});
module.exports = mongoose.model('Issue', issueSchema);