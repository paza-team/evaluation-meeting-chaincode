/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class evaluationMeetingTransfer extends Contract {

    async InitLedger(ctx) {
        const evaluationMeeting = {
            ID:
            Tender:
            Secretary:
            MeetingDate:
            Members: {},
            Attendance:
            Video:
            Minutes:
            Report:
            Documents:
            CurrentState:
        };
        
        const Tender ={
            ID:
            Issuer:
            Tender:
            Owner:
            IssusedDate:
            ClossedDate:
            EvaluationMeeting:
            CurrentState:
        };
        
        await ctx.stub.putState(evaluationMeeting.ID, Buffer.from(JSON.stringify(evaluationMeeting)));
        console.info(`evaluationMeeting ${evaluationMeeting.ID} initialized`);
    }

    // CreateevaluationMeeting issues a new evaluationMeeting to the world state with given details.
    async CreateEvaluationMeeting(ctx, id, tender, secretary, meetingDate, members, attendance, video, minutes, report, documents, state) {
        const evaluationMeeting = {
            ID:
            Tender:
            Secretary:
            MeetingDate:
            Members: {},
            Attendance:
            Video:
            Minutes:
            Report:
            Documents:
            CurrentState:
        };
        ctx.stub.putState(id, Buffer.from(JSON.stringify(evaluationMeeting)));
        return JSON.stringify(evaluationMeeting);
    }

    // ReadevaluationMeeting returns the evaluationMeeting stored in the world state with given id.
    async ReadEvaluationMeeting(ctx, id) {
        const evaluationMeetingJSON = await ctx.stub.getState(id); // get the evaluationMeeting from chaincode state
        if (!evaluationMeetingJSON || evaluationMeetingJSON.length === 0) {
            throw new Error(`The evaluationMeeting ${id} does not exist`);
        }
        return evaluationMeetingJSON.toString();
    }

    // UpdateevaluationMeeting updates an existing evaluationMeeting in the world state with provided parameters.
    async UpdateEvaluationMeeting(ctx, id, color, size, owner, appraisedValue) {
        const exists = await this.evaluationMeetingExists(ctx, id);
        if (!exists) {
            throw new Error(`The evaluationMeeting ${id} does not exist`);
        }

        // overwriting original evaluationMeeting with new evaluationMeeting
        const updatedEvaluationMeeting = {
            ID: id,
            Color: color,
            Size: size,
            Owner: owner,
            AppraisedValue: appraisedValue,
        };
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedEvaluationMeeting)));
    }

    // DeleteevaluationMeeting deletes an given evaluationMeeting from the world state.
    async DeleteEvaluationMeeting(ctx, id) {
        const exists = await this.evaluationMeetingExists(ctx, id);
        if (!exists) {
            throw new Error(`The evaluationMeeting ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // evaluationMeetingExists returns true when evaluationMeeting with given ID exists in world state.
    async evaluationMeetingExists(ctx, id) {
        const evaluationMeetingJSON = await ctx.stub.getState(id);
        return evaluationMeetingJSON && evaluationMeetingJSON.length > 0;
    }

    // GetAllevaluationMeetings returns all evaluationMeetings found in the world state.
    async GetAllEvaluationMeetings(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all evaluationMeetings in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }


}

module.exports = evaluationMeetingTransfer;
