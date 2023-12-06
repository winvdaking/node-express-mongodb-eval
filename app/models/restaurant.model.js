module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            cuisine: String,
            address: Array,
            borough: String,
            grades: Array,
            restaurant_id: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const restaurant = mongoose.model("new_york", schema);
    return restaurant;
};
