// SDK Library to asset with writing the logic
const { Contract } = require('fabric-contract-api');

// Business logic (well just util but still it's general purpose logic)
const util = require('util');

/**
 * Support the Updating of values within the SmartContract
 */
class EvaluationMeetingContract extends Contract {

    constructor(){
        super('EvaluationMeetingContract');
    }

    async transactionA(ctx, newValue) {
        // retrieve existing chaincode states
        let oldValue = await ctx.stub.getState(key);

        await ctx.stub.putState(key, Buffer.from(newValue));

        return Buffer.from(newValue.toString());
    }

    async transactionB(ctx) {
      //  .....
    }

};

module.exports = EvaluationMeetingContract