import mongoose_delete from "mongoose-delete" 
import mongoose from 'mongoose' 


const { Schema } = mongoose 

export interface ILead {
  incremental: number;
  number: string;
}

const LeadSchema = new Schema({
  display:{
    icon: {type: Schema.Types.String, default: '🔥'}
  },
  adviser:{
    type: Schema.Types.ObjectId,
    ref: 'Third',
    required: true
  },
  incremental:{
    type: Schema.Types.Number,
  },
  status:{
    type: Schema.Types.String,
    enum: ['grading', 'active', 'aborted', 'sold','dropped'],
    default: 'grading'
  },
  trackings:[
    {
      tracking: {type: Schema.Types.ObjectId, ref: 'Tracking'},
      interest: {type: Schema.Types.Number, default: 0},
      comment: {type: Schema.Types.String, default: ''},
      next_date: {type: Schema.Types.Date},
      created_at: {type: Schema.Types.Date, default: Date.now},
    }
  ],
  contact:{
    type: Schema.Types.ObjectId,
    ref: 'Third'
  }
}, {
  collection: 'leads', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

LeadSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: 'all',
  indexFields: 'all' 
}) 


export const LeadModel = mongoose.model<ILead, any>('Lead', LeadSchema) 