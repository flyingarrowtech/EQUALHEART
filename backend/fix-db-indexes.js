const mongoose = require('mongoose');
require('dotenv').config();

async function fixDatabaseIndexes() {
    try {
        console.log('🔧 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/matrimonial');
        console.log('✅ Connected to MongoDB\n');

        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        // Get current indexes
        console.log('📋 Current indexes on users collection:');
        const indexes = await usersCollection.indexes();
        indexes.forEach(idx => {
            console.log(`   - ${idx.name}: ${JSON.stringify(idx.key)}`);
        });

        // Drop the problematic mobile_1 index if it exists
        console.log('\n🗑️  Dropping old mobile_1 index...');
        try {
            await usersCollection.dropIndex('mobile_1');
            console.log('✅ Dropped mobile_1 index');
        } catch (err) {
            console.log('ℹ️  Index mobile_1 does not exist or already dropped');
        }

        // Drop the mobileNumber_1 index if it exists
        try {
            await usersCollection.dropIndex('mobileNumber_1');
            console.log('✅ Dropped mobileNumber_1 index');
        } catch (err) {
            console.log('ℹ️  Index mobileNumber_1 does not exist');
        }

        // Recreate the sparse unique index
        console.log('\n🔨 Creating new sparse unique index on mobileNumber...');
        await usersCollection.createIndex({ mobileNumber: 1 }, { unique: true, sparse: true });
        console.log('✅ Created sparse unique index on mobileNumber');

        console.log('\n📋 Updated indexes:');
        const newIndexes = await usersCollection.indexes();
        newIndexes.forEach(idx => {
            console.log(`   - ${idx.name}: ${JSON.stringify(idx.key)}`);
        });

        console.log('\n✅ Database indexes fixed successfully!');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
}

fixDatabaseIndexes();
