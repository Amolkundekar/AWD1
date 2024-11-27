const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/aggregationExample', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Schemas
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
});

const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    product: String,
    amount: Number,
});

// Define Models
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

// Insert Sample Data
async function insertSampleData() {
    await User.deleteMany({});
    await Order.deleteMany({});

    const users = await User.insertMany([
        { name: 'Alice', age: 25, city: 'New York' },
        { name: 'Bob', age: 30, city: 'San Francisco' },
        { name: 'Charlie', age: 22, city: 'New York' },
    ]);

    await Order.insertMany([
        { userId: users[0]._id, product: 'Laptop', amount: 1200 },
        { userId: users[0]._id, product: 'Mouse', amount: 25 },
        { userId: users[1]._id, product: 'Keyboard', amount: 75 },
    ]);
}

// Perform Aggregation
async function performAggregation() {
    const result = await User.aggregate([
        {
            $lookup: {
                from: 'orders',             // Target collection
                localField: '_id',          // Local field in 'users'
                foreignField: 'userId',     // Foreign field in 'orders'
                as: 'userOrders',           // Resulting array
            },
        },
        { $unwind: '$userOrders' },        // Deconstruct orders array
        {
            $group: {
                _id: '$_id',
                name: { $first: '$name' },
                city: { $first: '$city' },
                totalAmount: { $sum: '$userOrders.amount' },
            },
        },
        { $sort: { totalAmount: -1 } },    // Sort by total amount descending
        {
            $project: {
                _id: 0,
                name: 1,
                city: 1,
                totalAmount: 1,
            },
        },
    ]);

    console.log('Aggregation Result:', result);
}

// Main Function
async function main() {
    await insertSampleData();
    await performAggregation();
    mongoose.disconnect();
}

main().catch(err => console.error(err));









// 

// $lookup: Joins users with orders using _id from users and userId from orders.
// $unwind: Flattens the userOrders array.
// $group: Groups by _id to calculate the total amount spent by each user.
// $sort: Sorts users by their total spending in descending order.
// $project: Selects only name, city, and totalAmount in the final output.

// .